import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from '../common/catalog';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/catalog';


  getCatalogList(): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(`${this.baseUrl}`);
  }


}
