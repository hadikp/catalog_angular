import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogItemService {

  private httpClient = inject(HttpClient);
    
  private baseUrl = 'http://localhost:8080/catalog-item';
  private catalogUrl = 'http://localhost:8080/catalog';

  createItem(item: any) {
    return this.httpClient.post<any>(this.baseUrl, item);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${itemId}`);
  }

  getHistory(itemId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.catalogUrl}/${itemId}/item-history`);
  }

  
}
