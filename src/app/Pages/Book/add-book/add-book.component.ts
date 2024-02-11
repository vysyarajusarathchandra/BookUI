import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../../Models/book';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  books:Book;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router)
  {
  this.books=new Book();
}
AddCategory() {
  console.log(this.books);
  const userRole = localStorage.getItem("userRole") ?? "Guest";
  this.http
  .post('http://localhost:5256/api/Book/AddBook', this.books,this.httpOptions 
    
   
  )
  .subscribe((response) => {
    console.log(response);
  });
}
}