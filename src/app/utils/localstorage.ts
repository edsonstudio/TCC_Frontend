export class LocalStorageUtils {

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('ecom.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('ecom.token');
        localStorage.removeItem('ecom.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('ecom.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('ecom.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('ecom.user', JSON.stringify(user));
    }

}
