import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/localstorage';
import { throwError } from 'rxjs';

export abstract class BaseService {

    protected UrlAPIV1: string = environment.apiUrlV1;
    protected UrlAuth: string = environment.apiAuthUrlV1;
    public LocalStorage = new LocalStorageUtils();

    protected GetJsonHeader() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected GetJsonAuthHeader() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        const customError: string[] = [];
        const customResponse = { error: { errors: [] }};

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === 'Unknown Error') {
                customError.push('Ocorreu um erro desconhecido');
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push('Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.');

            // Erros do tipo 500 não possuem uma lista de erros
            // A lista de erros do HttpErrorResponse é readonly
            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        console.error(response);
        return throwError(response);
    }
}
