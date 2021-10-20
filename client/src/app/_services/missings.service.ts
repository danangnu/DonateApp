import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { find, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Missing } from '../_models/missing';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MissingsService {
  baseUrl= environment.apiUrl;
  missings: Missing[] = [];
  missingCache = new Map();
  userParams: UserParams;

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
   }

   getUserParams() {
     return this.userParams;
   }

   setUserParams(params: UserParams) {
     this.userParams = params;
   }

   resetUserParams() {
     this.userParams = new UserParams();
     return this.userParams;
   }

  getMissings(userParams: UserParams) {
    var response = this.missingCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    if (userParams.gender !== undefined && userParams.gender !== null)
      params = params.append('gender', userParams.gender);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('orderBy', userParams.orderBy);
    
    return this.getPaginatedResult<Missing[]>(this.baseUrl + 'missing', params)
      .pipe(map(response => {
        this.missingCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))

  }

  addLike(id: number) {
    return this.http.post(this.baseUrl + 'likes/' + id, {});
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = this.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return this.getPaginatedResult<Partial<Missing[]>>(this.baseUrl + 'likes', params);
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return params;
  }

  getMissing(id: string) {
    const missin = [...this.missingCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((missing: Missing) => missing.id.toString() === id);

    if (missin) {
      return of(missin);
    }
    return this.http.get<Missing>(this.baseUrl + 'missing/' + id);
  }

  postMissing(model: any) {
    return this.http.post(this.baseUrl + 'account/post-missing', model);
  }

  updateMissing(missing: Missing) {
    return this.http.put(this.baseUrl + 'missing', missing).pipe(
      map(() => {
        const index = this.missings.indexOf(missing);
        this.missings[index] = missing;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'missing/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'missing/delete-photo/' + photoId);
  }
}
