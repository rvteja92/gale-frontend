import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrawlerService {
  crawl_endpoint = '/api/crawler/crawl/';

  constructor(private httpClient: HttpClient) { }

  public crawl(url: string, depth: number):Observable<any> {
    return this.httpClient.post(
      `${environment.baseApiUrl}${this.crawl_endpoint}`,
      {
        url: url,
        depth: depth
      }
    )
  }
}
