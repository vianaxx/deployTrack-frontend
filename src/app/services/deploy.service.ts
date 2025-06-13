import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface DeployLog {
  id: number;
  application: string;
  version: string;
  environment: string;
  author: string;
  status: string; // Ex: SUCCESS, ERROR, ROLLBACK
  timestamp: string; // ISO date string (LocalDateTime será convertida pelo backend)
}

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  private apiUrl = 'http://localhost:8081/deploys';

  constructor(private http: HttpClient) { }

  getAllDeploys(): Observable<DeployLog[]> {
    return this.http.get<DeployLog[]>(this.apiUrl);
  }

  getDeployById(id: number): Observable<DeployLog> {
    return this.http.get<DeployLog>(`${this.apiUrl}/${id}`);
  }

  createDeploy(deploy: DeployLog): Observable<DeployLog> {
    return this.http.post<DeployLog>(this.apiUrl, deploy);
  }

  updateDeploy(id: number, deploy: DeployLog): Observable<DeployLog> {
    return this.http.put<DeployLog>(`${this.apiUrl}/${id}`, deploy);
  }

  deleteDeploy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  patchDeploy(id: number, partial: Partial<DeployLog>): Observable<DeployLog> {
    return this.http.patch<DeployLog>(`${this.apiUrl}/${id}`, partial);
  }

}
