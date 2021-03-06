import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Movie } from './movie/movie.component';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _http: HttpClient, private _authenticationService: AuthenticationService) { }

  get options() {
    return {
      headers: {
        authorization: `Bearer ${this._authenticationService.token}`
      }
    }
  }

  getMovies(page: number, movieTitle: string = ''): Observable<Movie[]> {
    const url = environment.movies_base_url;
    return this._http.get<Movie[]>(url, {
      params: {
        page,
        movieTitle
      }
    });
  }

  getMoviesPageCount(movieTitle: string = ''): Observable<number> {
    const url = environment.movies_base_url + '/count'
    return this._http.get<number>(url, {
      params: {
        movieTitle
      }
    });
  }

  getMovie(movieId: String): Observable<Movie> {
    const url = `${environment.movies_base_url}/${movieId}`;
    return this._http.get<Movie>(url);
  }

  addMovie(data: String): Observable<Movie> {
    const url = environment.movies_base_url;
    return this._http.post<Movie>(url, data, this.options);
  }

  updateMovie(movieId: string, data: String): Observable<Movie> {
    const url = `${environment.movies_base_url}/${movieId}`;
    return this._http.patch<Movie>(url, data, this.options);
  }

  deleteMovie(movieId: String): Observable<Movie> {
    const url = `${environment.movies_base_url}/${movieId}`;
    return this._http.delete<Movie>(url, this.options);
  }
}
