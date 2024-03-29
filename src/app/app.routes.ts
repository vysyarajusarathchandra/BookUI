import { Routes } from '@angular/router';
import { AddBookComponent } from './Pages/Book/add-book/add-book.component';
import { EditBookComponent } from './Pages/Book/edit-book/edit-book.component';
import { GetAllBooksComponent } from './Pages/Book/get-all-books/get-all-books.component';
import { GetBookByIdComponent } from './Pages/Book/get-book-by-id/get-book-by-id.component';
import { AdminDashboardComponent } from './Pages/User/admin-dashboard/admin-dashboard.component';
import { DeleteUserComponent } from './Pages/User/delete-user/delete-user.component';
import { EditUserComponent } from './Pages/User/edit-user/edit-user.component';
import { LoginComponent } from './Pages/User/login/login.component';
import { RegisterComponent } from './Pages/User/register/register.component';
import { UserDashboardComponent } from './Pages/User/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {path: 'user-dashboard',component:UserDashboardComponent,
    children:[
        {path:'get-all-books',component:GetAllBooksComponent},
        {path:'get-book-by-id',component:GetBookByIdComponent},
       
        {path:'edit-user',component:EditUserComponent},
        ]},
    {path:'admin-dashboard',component:AdminDashboardComponent,
    children:[
        {path:'add-book',component:AddBookComponent},
      
        {path:'edit-book/:id',component:EditBookComponent},
        {path:'get-all-books',component:GetAllBooksComponent},
        {path:'get-book-by-id',component:GetBookByIdComponent}
    ]},
    {path:'',component:RegisterComponent},
    {path:'login',component:LoginComponent},
];
