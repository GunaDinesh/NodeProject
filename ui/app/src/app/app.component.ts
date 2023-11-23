import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
  readonly APIURL = 'http://localhost:3002/api/';

  constructor(private http: HttpClient) {}

  products:any= [];
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
