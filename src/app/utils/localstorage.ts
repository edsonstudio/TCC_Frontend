export class LocalStorageUtils {

    public getUser() {
        return JSON.parse(localStorage.getItem('ecom.user'));
    }

    public saveUserLocalData(response: any) {
        this.saveUserToken(response.accessToken);
        this.saveUser(response.userToken);
    }

    public cleanUserLocalData() {
        localStorage.removeItem('ecom.token');
        localStorage.removeItem('ecom.user');
    }

    public getUserToken(): string {
        return localStorage.getItem('ecom.token');
    }

    public saveUserToken(token: string) {
        localStorage.setItem('ecom.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('ecom.user', JSON.stringify(user));
    }

}
