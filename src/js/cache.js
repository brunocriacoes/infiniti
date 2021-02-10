import store from './store.js'
export default {
    set localizador(valor) {
        localStorage.setItem('localizador', valor)
    },
    get localizador() {
        return localStorage.getItem('localizador')
    },
    set username(valor) {
        localStorage.setItem('username', valor)
    },
    get username() {
        return localStorage.getItem('username')
    },
    set corruent_user(valor) {
        sessionStorage.setItem('CORRUENT_USER', JSON.stringify(valor))
    },
    get corruent_user() {
        let data_user = sessionStorage.getItem('CORRUENT_USER')
        if (data_user) {
            return JSON.parse(data_user)
        }
        return store.corruent_user
    },
    set token(valor) {
        if( valor == null) {
            sessionStorage.removeItem('TOKEN')
        } else {
            sessionStorage.setItem('TOKEN', valor)
        }
    },
    get token() {
        return sessionStorage.getItem('TOKEN')
    },
    set devolver(valor) {
        let devolvidas = this.devolver
        devolvidas = [ valor,...devolvidas ]
        devolvidas.slice( 0, 5 )
        localStorage.setItem('DEVOLVER', JSON.stringify(devolvidas))
        return devolvidas
    },
    get devolver() {
        return JSON.parse( localStorage.getItem('DEVOLVER'), '[]' )
    },    
    set entregar(valor) {
        let entregues = this.entregar
        entregues = [ valor,...entregues ]
        entregues.slice( 0, 5 )
        localStorage.setItem('ENTREGAR', JSON.stringify(entregues))
        return entregues
    },
    get entregar() {
        return JSON.parse( localStorage.getItem('ENTREGAR'), '[]' )
    },
}