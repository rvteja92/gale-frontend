import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routes } from './/app-routing.module';
import { RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { PushttComponent } from './pushtt/pushtt.component';


// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         if (currentUser && currentUser.token) {
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `JWT ${currentUser.token}`
//                 }
//             });
//         }

//         return next.handle(request);
//     }
// }


// @Injectable()
// export class KeycloakTokenInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         // console.debug('Interceptor:', currentUser);

//         if (currentUser && currentUser.access_token) {
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${currentUser.access_token}`
//                 }
//             });
//         }

//         return next.handle(request);
//     }
// }


@NgModule({
    declarations: [
        AppComponent,
        // HomeComponent,
        // PushttComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFToken'
        }),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        // // HttpClientModule
        // { provide: HTTP_INTERCEPTORS, useClass: KeycloakTokenInterceptor, multi: true },
        // // { provide: APP_INITIALIZER, useFactory: initializer, multi: true, deps: [KeycloakService] }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

