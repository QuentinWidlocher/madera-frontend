import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';
import { Plan } from 'src/app/classes/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<object> {
    return this.http.get(ApiConfig.PLAN);
  }

  get(id: number): Observable<object> {
    return this.http.get(ApiConfig.PLAN.replace(':id', '' + id));
  }

  add(plan: Plan): Observable<object> {
    plan.id = undefined;
    const planPlain = { ...plan };

    return this.http.post(ApiConfig.PLAN, planPlain);
  }

  edit(plan: Plan): Observable<object> {
    const planPlain = { ...plan };
    return this.http.put(ApiConfig.PLAN, planPlain);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(ApiConfig.PLAN_UNIQUE.replace(':id', '' + id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.PLAN_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.PLAN_EXISTS.replace(':id', '' + id));
  }

}
