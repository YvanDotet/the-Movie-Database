import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DonneesService {

  private api:string='cfb2b338648587f6aabd21fd2342712b'; // clé api gratuite

  constructor(private http:HttpClient) { }

  private handleError(error,caught)
  {
    console.log(error,caught);
    
    return of(error)
  }

  getPopulars(numPage:number):Observable<any>{
    return this.http
    .get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.api}&page=${numPage}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getDataBySearch(text:string,numPage:number):Observable<any>{
    return this.http
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${this.api}&query=${text}&page=${numPage}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getDataById(cetId:number):Observable<any>{
    return this.http
    .get(`https://api.themoviedb.org/3/movie/${cetId}?api_key=${this.api}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getActors(cetId:number):Observable<any>{
    return this.http
    .get(`https://api.themoviedb.org/3/movie/${cetId}/credits?api_key=${this.api}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getSimilars(cetId:number):Observable<any>{
    return this.http
    .get(`https://api.themoviedb.org/3/movie/${cetId}/similar?api_key=${this.api}`)
    .pipe(
      catchError(this.handleError)
    )
  }

}
