import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "@environments/environment";
import {
  RequestCreateUser,
  RequestSimulacao,
  ReturnCreateUser,
  ReturnSimulacao
} from "@app/session/sension.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  cadastraUsuario(request: RequestCreateUser): Observable<ReturnCreateUser> {
    return this.http.post<ReturnCreateUser>(`${this.url}/user`, request);
  }

  cadastraSolicitacao(id: string, request: RequestSimulacao): Observable<ReturnSimulacao> {
    return this.http.post<ReturnSimulacao>(`${this.url}/offer/${id}`, request);
  }

  aceitaSolicitacao(id: string): Observable<any> {
    return this.http.put<any>(`${this.url}/offer/${id}`, {});
  }



}

