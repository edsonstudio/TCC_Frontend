import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { BaseService } from '../base.service';

@Injectable()
export class AccountService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    registerUser(user: User): Observable<User> {
        const response = this.http
            .post(`${this.UrlAuth}/nova-conta`, user, this.GetJsonHeader())
            .pipe(
                map(this.extractData)
            );

        return response;
    }

    Login(user: User): Observable<User> {
        const response = this.http
            .post(`${this.UrlAuth}/entrar`, user, this.GetJsonHeader())
            .pipe(
                map(this.extractData));

        return response;
    }
}
