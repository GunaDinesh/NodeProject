import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
  readonly APIURL = 'http://localhost:3002/api/';

  constructor(private http: HttpClient) {}

  productForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl()
  });

  products:any= [];

  submitBook() {
    console.log(this.productForm.value);
    this.http.post(this.APIURL + 'product', this.productForm.value).subscribe(data => {
      this.refreshProducts();
    })
  }
  refreshProducts() {
    this.http.get(this.APIURL + 'products').subscribe(data => {
      console.log(data);
      this.products = data;
    });
  };

  deleteProduct(id: string){
    this.http.delete(this.APIURL + 'products/'+id).subscribe(data => {
      alert(data);
      this.refreshProducts();
    });

  }

  ngOnInit() {
    this.refreshProducts();
  }
}
