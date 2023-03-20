import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    listaDeptos:string[]=["1","2","3", "4"];

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    getAllDeptos() {
        console.log("get all 1");
        return this.http.get<any>(`http://127.0.0.1:8000/api/apiVendedorList`);
    }
    getProducto(id: BigInteger) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apiProductShow/${id}`);
        //return this.http.get<any>(`http://127.0.0.1:8000/api/apiProductList`);
        //return this.http.get<any>(`http://127.0.0.1:8000/api/apiList/${id}`);
    }

    deleteNotify(id: BigInteger) {
        return this.http.delete(`http://127.0.0.1:8000/api/apiProductDelete/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                //return x;
            }));
    }

    getNotify(id: string) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apiNotifyShow/${id}`);
    }

    getNotifyUnique(id: BigInteger) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apiNotifyUnique/${id}`);
    }

    updateNotify(id: BigInteger, params: any) {
        //params, directo nota
        console.log("Params: " + params["nota"])
        const body = { nota: ' ' };
        body["nota"] = params["nota"];
        this.http.put<any>(`http://127.0.0.1:8000/api/apiNotifyUpdate/${id}`, body).subscribe(data => {
            })
    }

    postNotify(params: any) {
        //params, directo nota
        console.log("Params call: " + params["nota"])
        console.log("Params id: " + params["id"])
        const body = { nota: ' ',  id: 0};
        //se envia el id fk
        body["nota"] = params["nota"];
        body["id"] = params["id"];
        return this.http.post<any>(`http://127.0.0.1:8000/api/apiNotifyNew/`, body);
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}

    getNotify(id: string) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apiNotifyShow/${id}`);
    }

    getNotifyUnique(id: BigInteger) {
        return this.http.get<any>(`http://127.0.0.1:8000/api/apiNotifyUnique/${id}`);
    }

    updateNotify(id: BigInteger, params: any) {
        //params, directo nota
        console.log("Params: " + params["nota"])
        const body = { nota: ' ' };
        body["nota"] = params["nota"];
        this.http.put<any>(`http://127.0.0.1:8000/api/apiNotifyUpdate/${id}`, body).subscribe(data => {
            })
    }

    postNotify(params: any) {
        //params, directo nota
        console.log("Params call: " + params["nota"])
        console.log("Params id: " + params["id"])
        const body = { nota: ' ',  id: 0};
        //se envia el id fk
        body["nota"] = params["nota"];
        body["id"] = params["id"];
        return this.http.post<any>(`http://127.0.0.1:8000/api/apiNotifyNew/`, body).subscribe(data => {
            });
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
