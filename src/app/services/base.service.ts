import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/localstorage';

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
                'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }
}
