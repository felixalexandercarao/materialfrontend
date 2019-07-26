import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import{ Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import{IPokemon} from'./product';
import{catchError} from'rxjs/operators'


@Injectable(
    {
    providedIn:'root'
}
)

export class PokemonService{
    private Url="https://localhost:5001/api/products";
    constructor(private http:HttpClient){}
    getDoge():Observable<IPokemon[]>{
        return this.http.get<IPokemon[]>(this.Url)
        .pipe(catchError(this.errorHandler));
    }
    postDoge(product:any):Observable<any>{
        return this.http.post<any>(this.Url,product)
        .pipe(catchError(this.errorHandler));
    }
    errorHandler(error:HttpErrorResponse){
        return throwError(error.message||"Server Error")

    }
    deleteProduct(product:any):Observable<any>{
        return this.http.delete<any>(this.Url+'/'+product.id).pipe(
            catchError(this.errorHandler));
    }
    updateProduct(product:any):Observable<any>{
        return this.http.put<any[]>(this.Url+'/'+product.id, product).pipe(
            catchError(this.errorHandler));
    }
}

