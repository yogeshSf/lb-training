import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models';

import { CrudService } from '../helpers/request';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserService extends CrudService<UserI, number | undefined>  {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/users`);
  }
}
// import { Injectable } from '@angular/core';
// import { Observable, of } from "rxjs";
// import { UserI } from '../models';

// import UserList from '../constants/users';

// @Injectable()
// export class UserService {

//   UserList: UserI[];

//   _cacheKey = 'USER_DATA'

//   constructor() {
//     this.UserList = this.getData() || UserList
//   }

//   create(user: UserI): Observable<UserI> {
//     const newUser = { ...user, id: this.UserList.length + 1 }
//     this.UserList.push(newUser);
//     this.setData();
//     return of(newUser);
//   }

//   get(): Observable<UserI[]> { return of(this.UserList); }

//   update(user: UserI): Observable<UserI> {
//     const index = this.UserList.findIndex(ele => ele.id === user.id);
//     this.UserList[index] = user;
//     this.setData();
//     return of(user);
//   }

//   delete(id: number): Observable<Number> {
//     this.UserList = this.UserList.filter(user => user.id !== id)
//     this.setData();
//     return of(id);
//   }

//   setData() { localStorage.setItem(this._cacheKey, JSON.stringify(this.UserList)) }

//   getData(): any {
//     const data = localStorage.getItem(this._cacheKey)
//     return data ? JSON.parse(data || '') : null;
//   }
// }
