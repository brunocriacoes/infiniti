export default {
    corruent_user: {
        set username(valor) {
            document.querySelector('.js-username').innerHTML = valor
        },
        set company(valor) {
            document.querySelector('.js-company').innerHTML = valor
        },
        set logo(valor) {
            document.querySelector('.js-logo').src = valor
        }
    },
    set loading(status) {
        if (status) {
            document.querySelector('.pre-load').removeAttribute('hidden')
        } else {
            document.querySelector('.pre-load').setAttribute('hidden', '')
        }
    },
    set lista_de_nomes(valor) {
        let tpl = user => `
            <a 
                href="#/peca-por-user/${user.id}/${user.name}" 
                onclick="app.peca_detelhe(${user.id}, '${user.name}')" 
                class="list__item grid--lista-nomes"
            >
                <span>${user.name}</span>
                <b class="list_b_more">
                    <span>${user.piece_total}</span>
                    <small>Ativas</small>
                </b>
                <b class="list_b_more">
                    <span>${user.piece_total_invalid}</span>
                    <small>Vencida(s)</small>
                </b>
            </a>
        `
        document.querySelector('.js-list-name').innerHTML = valor.map( tpl ).join('')
    },
    fomulario_login: {
        get localizador() {
            return document.f_login.locator.value
        },
        set localizador( valor ) {
            document.f_login.locator.value = valor
        },
        get username() {
            return document.f_login.user.value
        },
        set username( valor ) {
            document.f_login.user.value = valor
        },
        get pass() {
            return document.f_login.pass.value
        },
    }, 
    alert: {
        set login( valor ) {
            document.querySelector('.js-alert-login').innerHTML = valor
        }
    },

}

