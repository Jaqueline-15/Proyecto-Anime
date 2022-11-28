import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  //baseUrl : string = 'http://localhost:4000/api';
  baseUrl: string = 'https://proyectoanime.herokuapp.com/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

   //método para agregar un nuevo anime
   agregarAnime(data): Observable<any>{
    let url = `${this.baseUrl}/create`;
    return this.http.post(url,data).pipe(catchError(this.errorMgmt));
  }

  //método que obtiene a todos los animes
  getAnimes(){
    let url= `${this.baseUrl}/anime`;
    return this.http.get(url);
  }

  //método para obtener un solo anime por su id
  getAnime(id):Observable<any>{
    let url = `${this.baseUrl}/anime/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:Response)=>{
      return res || {};
    }),
    catchError(this.errorMgmt)
    );
  }

  //método para actuaizar un anime
  updateAnime(id,data):Observable<any>{
    let url = `${this.baseUrl}/update/${id}`;
    return this.http.put(url, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  //método para eliminar un anime
  deleteAnime(id): Observable<any>{
  let url = `${this.baseUrl}/delete/${id}`;
  return this.http.delete(url, {headers: this.headers}).pipe(
    catchError(this.errorMgmt)
   );
  }

  //método manejador de errorres
  errorMgmt(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //obtenemos el error del lado del cliente
      errorMessage = error.error.message;
    }else{
      //obtenemos el error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() =>{
      return errorMessage;
    });
  }
}
