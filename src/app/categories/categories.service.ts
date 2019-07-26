import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import{ Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import{ICategory} from'./categories';
import{catchError} from'rxjs/operators'


@Injectable(
    {
    providedIn:'root'
}
)

export class CategoryService{
    private Url="https://localhost:5001/api/categories";
    constructor(private http:HttpClient){}
    getCategories():Observable<ICategory[]>{
        return this.http.get<ICategory[]>(this.Url)
        .pipe(catchError(this.errorHandler));
    }
    postCategory(category:any):Observable<any>{
        return this.http.post<any>(this.Url,category)
        .pipe(catchError(this.errorHandler));
    }
    errorHandler(error:HttpErrorResponse){
        return throwError(error.message||"Server Error")

    }
    deleteCategory(category:any):Observable<any>{
        return this.http.delete<any>(this.Url+'/'+category.id).pipe(
            catchError(this.errorHandler));
    }
    updateCategory(category:any):Observable<any>{
        return this.http.put<any[]>(this.Url+'/'+category.id, category).pipe(
            catchError(this.errorHandler));
    }
}

