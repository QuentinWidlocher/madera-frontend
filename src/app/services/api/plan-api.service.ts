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
    return this.http.get(ApiConfig.PLAN_UNIQUE.replace(':id', '' + id));
  }

  add(plan: Plan): Observable<object> {
    plan.id = undefined;
    plan = Object.assign(Plan.newEmpty(), plan);
    return this.http.post(ApiConfig.PLAN, plan);
  }

  edit(plan: Plan): Observable<object> {
    const planPlain = { ...plan };
    return this.http.put(ApiConfig.PLAN_UNIQUE.replace(':id', '' + plan.id), planPlain);
  }

  delete(plan: Plan): Observable<object> {
    return this.http.delete(ApiConfig.PLAN_UNIQUE.replace(':id', '' + plan.id));
  }

  count(): Observable<object> {
    return this.http.get(ApiConfig.PLAN_COUNT);
  }

  exist(id: number): Observable<object> {
    return this.http.get(ApiConfig.PLAN_EXISTS.replace(':id', '' + id));
  }

}
