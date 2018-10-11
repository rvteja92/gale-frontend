const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


//Install express server
const express = require('express');
const request = require('request');
const path = require('path');
const cors = require('cors');


if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < 2 * numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const app = express();
    app.use(cors());


    // Serve only the static files form the dist directory
    app.use(express.static(__dirname + '/dist/fieldwatch'));



    app.get('/api/floors/:floorId', (req, res) => {
        const floor_id = req.params.floorId;
        const floormapUrl = "https://positioning-api.indooratlas.com/v1/floor_plans/" + floor_id + '?key=' + process.env.INDOORATLAS_API_KEY;
        console.log(floormapUrl);

        request(floormapUrl, (err, resp, body) => {
            if (err) res.status(404).send("Invalid Venue ID");

            console.log(body);

            const floorData = JSON.parse(body);
            floorData.image.url = "/fp?q=" + encodeURIComponent(floorData.image.url);
            res.send(floorData);
        });
    });

    app.use('/fp', function(req, res, next) {
        request(req.query.q).pipe(res);
    });


    app.get('/*', function(req,res) {
        res.sendFile(path.join(__dirname+'/dist/fieldwatch/index.html'));
    });

    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);

    console.log(`Worker ${process.pid} started`);
  }



/*
var http = http.Server(app);
var io = require('socket.io')(http);

io.on('connect', function(socket){
    console.log('a user connected');

    socket.on('venue-id', function (data) {
      console.log('Got venue id', data);
    });

    socket.on('point', function(data){
      console.log('User pointed', data);

      socket.emit('display', data);
    });

    socket.on('disconnect', function() {
      console.log("User disconnected");
    })
});

io.on('disconnect', function(){
  console.log('user disconnected');
});
*/
