import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {User} from '../_helpers/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, { 'username': username, 'password': password },
      { headers: {'Content-Type':'application/json',}, observe: 'response', responseType: 'json' })
      .pipe(map(data => {
        // let authorization = data.headers.get('Authorization').replace('Bearer ', '');
        let authorization = data.body.token;
        // let roles = data.body.role;
        let role = username.toLowerCase().includes('admin') ? 'Admin': 'User';
        if (data && authorization) {
          let user: User = { authorization: authorization, role: role };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return data;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
