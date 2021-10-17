import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Missing } from '../_models/missing';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MissingsService {
  baseUrl= environment.apiUrl;
  missings: Missing[] = [];
  paginatedResult: PaginatedResult<Missing[]> = new PaginatedResult<Missing[]>();

  constructor(private http: HttpClient) { }

  getMissings(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Missing[]>(this.baseUrl + 'missing', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
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
