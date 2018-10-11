import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrawlerService } from './crawler.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
})
export class AppComponent implements OnInit{
    url = new FormControl('');
    depth = new FormControl('');

    crawled_image_urls = [];
    error = false;

    constructor(private crawler: CrawlerService) {}

    ngOnInit(): void { }

    public crawl() {
        const url = this.url.value;
        const password = this.depth.value;

        this.crawler.crawl(url, password).subscribe((data) => {
            if (data.status === 'success') {
                this.crawled_image_urls = data.images;
                this.error = false;
            } else {
                this.error = true
            }
        });
    }
}
