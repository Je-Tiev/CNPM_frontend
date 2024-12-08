import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url +
      '/shop/addShop', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  update(data: any) {
    return this.httpClient.post(this.url +
      '/shop/update', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getShops() {
    return this.httpClient.get(this.url + '/shop/getShop');
  }

  getShopBills(id: any) {
    return this.httpClient.get(this.url + '/shop/getShopBills/' + id);
  }

  updateStatus(data: any) {
    return this.httpClient.post(this.url +
      '/shop/updateStatus', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  delete(id: any) {
    return this.httpClient.post(this.url +
      '/shop/delete/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getByID(id: any) {
    return this.httpClient.get(this.url + '/shop/getByID/' + id);
  }
}
