import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../Models/book';

@Component({
  selector: 'app-get-all-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './get-all-books.component.html',
  styleUrl: './get-all-books.component.css'
})
export class GetAllBooksComponent {
  books: any[] = []
  userRole:string=""
  bookTitle:string=""
  isEligible: boolean = false
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router) {
    this.getAllBooks();
  }
  ngOnInit() {
    this.getAllBooks();
  this.userRole = localStorage.getItem("userRole") ?? "User"
  this.isEligible = this.userRole == "Admin" ?? false
  }
  searchBookByTitle(){
    this.http.get<Book>(`http://localhost:5256/api/Book/GetBookByTitle?search=${this.bookTitle}`,this.httpOptions).subscribe((response)=>{
      if(response!=null){
        this.books=[response]
      }
    })
  }
  getAllBooks() {
    this.http.get<Book[]>('http://localhost:5256/api/Book/GetBooks', {
      headers: this.httpOptions.headers,
    }).subscribe((response) => {
      if (response != null && response.length > 0) {
        this.books = response;
        console.log(this.books);
      }
    })
  }
  delete(id: any) {

    console.log(id);
    this.http
      .delete('http://localhost:5256/api/Book/DeleteBook/' + id, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
    this.getAllBooks();
    location.reload();
  }

  edit(id: any) {
    this.router.navigateByUrl('/admin-dashboard/edit-book/' + id);
  }
  view(Bookid: any) {
    this.router.navigateByUrl('/admin-dashboard/get-book-by-id/' + Bookid);
  }
}
