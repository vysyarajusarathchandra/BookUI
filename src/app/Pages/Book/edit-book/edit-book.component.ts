import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../Models/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  book: any;
  bookId=0;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.book = new Book();
    this.activateRoute.params.subscribe((p) => (this.bookId = p['id']));
    console.log(this.bookId);
    this.find();
  }
  find(){
    this.http.get<Book>('http://localhost:5256/api/Book/GetBookById/'+this.bookId,this.httpOptions).subscribe((response)=>{
      console.log(response);
        if (response != null) {
          this.book = response;
        }
    })
  }
  EditBook(id:any) {
    console.log(id);
    this.http
      .put('http://localhost:5256/api/Book/EditBook', this.book,this.httpOptions)
      .subscribe((response) => {
        this.router.navigateByUrl('admin-dashboard/get-all-books');
      });
  }
}
