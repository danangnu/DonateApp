import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Missing } from '../_models/missing';

@Injectable({
  providedIn: 'root'
})
export class MissingsService {
  baseUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMissings() {
    return this.http.get<Missing[]>(this.baseUrl + 'missing');
  }

  getMissing(id: string) {
    return this.http.get<Missing>(this.baseUrl + 'missing/' + id);
  }

  updateMissing(missing: Missing) {
    return this.http.put(this.baseUrl + 'missing', missing);
  }
}
