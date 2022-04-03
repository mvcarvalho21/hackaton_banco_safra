import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "@environments/environment";
import {RequestCreateUser, RequestSimulacao, ReturnCreateUser, ReturnSimulacao} from "@app/session/sension.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private url = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  cadastraUsuario(request: RequestCreateUser): Observable<ReturnCreateUser> {
    return this.http.post<ReturnCreateUser>(this.url, request);
  }

  cadastraSolicitacao(request: RequestSimulacao): Observable<ReturnSimulacao> {
    return this.http.post<ReturnSimulacao>(this.url, request);
  }


}

