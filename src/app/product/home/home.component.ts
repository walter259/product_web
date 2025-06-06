import { AfterViewInit, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'brand',
    'price',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Product>();

  constructor(private productService: ProductService) {}
  filteredProducts: Product[] = [];
  products: Product[] = [];
  price: any = undefined;
  product: Product = {
    id: 0,
    name: '',
    brand: '',
    price: this.price,
  };
  
  ngAfterViewInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(data);
    });
  }

  setProduct(rowData: Product) {
    this.product.id = rowData.id;
    this.product.name = rowData.name;
    this.product.brand = rowData.brand;
    this.product.price = rowData.price;
  }

  addUpdateProduct(product: Product) {
    if (product.id !== 0) {
      //update product
      this.productService.updateProduct(product).subscribe({
        next: (data) => {
          console.log('Product updated');
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      //create product
      this.productService.createProduct(product).subscribe({
        next: (data) => {
          console.log('New Product');
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteProduct(id: Number) {
    const isConfirm = window.confirm('Are you sure you want to Delete?');

    if (isConfirm) {
      this.productService.deleteProduct(id).subscribe((data) => {
        this.products = this.products.filter((item) => item.id !== id);
      });
      window.location.reload();
    }
  }

  searchProducts(input:any) {
    this.filteredProducts = this.products.filter(
      item =>
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.brand.toLowerCase().includes(input.toLowerCase()) ||
        item.price.toString().includes(input))
        
     this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);
  }
}
