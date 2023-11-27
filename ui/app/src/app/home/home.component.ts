import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'home';
  readonly APIURL = 'http://localhost:3002/api/';

  constructor(private http: HttpClient) {}

  productForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl()
  });

  products:any= [];

  addProduct() {
    this.http.post(this.APIURL + 'product', this.productForm.value).subscribe(data => {
      this.refreshProducts();
    })
  }
  refreshProducts() {
    this.http.get(this.APIURL + 'products').subscribe(data => {
      this.products = data;
    });
  };

  deleteProduct(id: string){
    this.http.delete(this.APIURL + 'products/'+id).subscribe(data => {
      this.refreshProducts();
    });

  }

  ngOnInit() {
    this.refreshProducts();
  }

}
