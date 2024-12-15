import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CakeService {

  baseUrl = `http://127.0.0.1:8000/api`;
  private _authState = new BehaviorSubject<boolean>(this.isAuthenticated());
  
  constructor(private http: HttpClient, private router: Router) { }



  get authState() {
    return this._authState.asObservable();
  }



  updateAuthState(isLoggedIn: boolean) {
    this._authState.next(isLoggedIn);
  }



  private getHeaders(): HttpHeaders | null {
    
    const TOKEN = localStorage.getItem('token') ?? null;
    
    if (!TOKEN) {
      this.router.navigateByUrl('');
      return null;
    }

    return new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${TOKEN}`
    })
  }



  createAccount(data: any) {

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/register/`, data, { headers: header });
  }



  authorize(data: any) {

    return this.http.post(`${this.baseUrl}/token/`, data);
  }



  private getObservableResponse(
    endpointUrl: string,
    requestMethod: 'get' | 'post' | 'put' | 'delete',
    data: any,
  ): Observable<any> | null {

    const TOKEN = localStorage.getItem('token') ?? null;
    
    if (!TOKEN) {
      this.router.navigateByUrl('');
      return null;
    }

    const header = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${TOKEN}`
    })

    switch(requestMethod) {

      case 'get':
        return this.http.get(`${this.baseUrl}/${endpointUrl}`, { headers: header});
      case 'post':
        return this.http.post(`${this.baseUrl}/${endpointUrl}`, data, { headers: header});
      case 'put':
        return this.http.put(`${this.baseUrl}/${endpointUrl}`, data, { headers: header});
      case 'delete':
        return this.http.delete(`${this.baseUrl}/${endpointUrl}`, { headers: header});
    }
  }

  getAllCakes() {
    return this.getObservableResponse('cake/','get', null);
    // return this.http.get(`${this.baseUrl}/cake/`, { headers: header });
  }



  getCakeDetail(id: any) {
    return this.getObservableResponse(`cake/${id}/`, 'get', null);
    // return this.http.get(`${this.baseUrl}/cake/${id}/`, { headers: header });
  }



  addToCart(id: any) {
    return this.getObservableResponse(`cake/${id}/add_to_cart/`, 'post', null)
    // return this.http.post(`${this.baseUrl}/cake/${id}/add_to_cart/`, null, { headers: header });
  }



  listCartItems() {
    return this.getObservableResponse('cart/', 'get', null);
    // return this.http.get(`${this.baseUrl}/cart/`, { headers: header });
  }



  placeOrder(id: any, data: any) {
    return this.getObservableResponse(`cake/${id}/place_order/`, 'post', data);
    // return this.http.post(`${this.baseUrl}/cake/${id}/place_order/`, data, { headers: header });
  }



  listOrders() {
    return this.getObservableResponse(`order/`, 'get', null);
    // return this.http.get(`${this.baseUrl}/order/`, { headers: header });

  }



  addReview(id: any, data: any) {
    return this.getObservableResponse(`cake/${id}/add_review/`, 'post', data);
    // return this.http.post(`${this.baseUrl}/cake/${id}/add_review/`, data, { headers: header });
  }



  getOccasions() {
    return this.getObservableResponse(`cake/get_occasion/`, 'get', null);
    // return this.http.get(`${this.baseUrl}/cake/get_occasion/`, { headers: header });
  }



  filterCakeByOccasion(occasion: any) {
    return this.getObservableResponse(`cake/?occasion=${occasion}`, 'get', null);
    // return this.http.get(`${this.baseUrl}/cake/?occasion=${occasion}`, { headers: header });
  }



  removeCakeInCart(id: any) {
    return this.getObservableResponse(`cart/${id}/`, 'delete', null);
  }


  isAuthenticated() {
    return 'token' in localStorage;
  }
}
