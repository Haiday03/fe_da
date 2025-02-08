import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role, User } from '../../api/user-detail/User';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../service/general/api.service';
import { UserToken } from '../../api/user-detail/UserToken';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'currentUser';
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  userToken!: UserToken | null;
  
  

  constructor(private http: HttpClient,private apiService: ApiService) {
    this._isLoggedIn$.next(!!this.token);
    this.userToken=this.getUser(this.token!);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  isAuthorized() {
    return !!this.userToken;
  }
  
  hasRoleCode(roleCode: string) {
    return this.isAuthorized() && this.userToken?.roleCode === roleCode;
}

  hasRole(role: string) {
      return this.isAuthorized() && this.userToken?.role === role;
  }
  hasUsername(username: string) {
    return this.isAuthorized() && this.userToken?.username === username;
}
  hasAccessToDelete() {
    return this.userToken?.username;
}
  
  login(username: string, password: string) {
    return this.apiService.login(username,password)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem(this.TOKEN_NAME, JSON.stringify(user));
          this._isLoggedIn$.next(true);
          this.userToken = this.getUser(user.token);
        }
        return user;
      }));
  }
  register(registerData) {
    return this.apiService.register(registerData)
      .pipe(map(resp => {
        return resp;
      }));
  }
  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  private getUser(token: string): UserToken | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as UserToken;
  }
}