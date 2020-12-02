import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { v4 as Guid } from 'uuid';
import { BaseService } from '../base.service';

@Injectable({
    providedIn: 'root'
})

export class CategoryService extends BaseService{

    constructor(private http: HttpClient) {
        super();
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.UrlAPIV1}/categories`, super.GetJsonAuthHeader());
    }

    getCategory(id: typeof Guid): Observable<Category>{
    return this.http.get<Category>(`${this.UrlAPIV1}/categories/${id}`, super.GetJsonAuthHeader());
    }

    postCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(`${this.UrlAPIV1}/categories`, category, super.GetJsonAuthHeader());
    }

    deleteCategory(id: typeof Guid): Observable<Category> {
       return this.http.delete<Category>(`${this.UrlAPIV1}/categories/${id}`, super.GetJsonAuthHeader());
    }

    putCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.UrlAPIV1}/categories/${category.id}`,
        category, this.GetJsonAuthHeader());
    }
}
