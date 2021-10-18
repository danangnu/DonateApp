import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private http: HttpClient) { }

  getMissings(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    if (userParams.gender !== undefined && userParams.gender !== null)
      params = params.append('gender', userParams.gender);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('orderBy', userParams.orderBy);
    
    return this.getPaginatedResult<Missing[]>(this.baseUrl + 'missing', params);
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
    const missing = this.missings.find(x => x.id === Number(id));
    if (missing !== undefined) return of(missing);
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
