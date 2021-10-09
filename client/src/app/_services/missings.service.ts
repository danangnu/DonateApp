import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Missing } from '../_models/missing';

@Injectable({
  providedIn: 'root'
})
export class MissingsService {
  baseUrl= environment.apiUrl;
  missings: Missing[] = [];

  constructor(private http: HttpClient) { }

  getMissings() {
    if (this.missings.length > 0) return of(this.missings);
    return this.http.get<Missing[]>(this.baseUrl + 'missing').pipe(
      map(missings => {
        this.missings = missings;
        return missings;
      })
    );
  }

  getMissing(id: string) {
    const missing = this.missings.find(x => x.id === Number(id));
    if (missing !== undefined) return of(missing);
    return this.http.get<Missing>(this.baseUrl + 'missing/' + id);
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
