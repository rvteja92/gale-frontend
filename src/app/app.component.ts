import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrawlerService } from './crawler.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
})
export class AppComponent implements OnInit {
    url = new FormControl('');
    depth = new FormControl('');

    crawled_image_urls = [];
    error = false;
    page = 1;
    loading = false;
    complete = false;

    constructor(private crawler: CrawlerService) {}

    ngOnInit(): void { }

    public crawl() {
        const url = this.url.value;
        const password = this.depth.value;

        this.complete = false;
        this.loading = true;
        this.crawled_image_urls = [];
        this.page = 1;
        this.crawler.crawl(url, password, this.page).subscribe((data) => {
            if (data.status === 'success') {
                this.crawled_image_urls = data.images;
                this.error = false;
                this.complete = data.complete;
                this.page++;
            } else {
                this.error = true;
            }
        },
        () => {},
        () => {
            this.loading = false;
        });
    }

    public onScroll() {
        const url = this.url.value;
        const password = this.depth.value;
        // this.page++;

        if (!this.complete && !this.loading) {
            this.loading = true;
            this.crawler.crawl(url, password, this.page).subscribe((data) => {
                if (data.status === 'success') {
                    this.crawled_image_urls = this.crawled_image_urls.concat(data.images);
                    this.error = false;
                    this.complete = data.complete;
                    this.page++;
                } else {
                    this.error = true;
                }
            },
            () => {},
            () => {
                this.loading = false;
            });
        }
    }
}
