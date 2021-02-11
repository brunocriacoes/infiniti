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
                href="#/peca-por-user/${user.id}/${user.nome}" 
                onclick="app.lista_de_peca_por_nome(${user.id}, '${user.nome}')" 
                class="list__item grid--lista-nomes"
            >
                <span>${user.nome}</span>
                <b class="list_b_more">
                    <span>${user.total}</span>
                    <small>Ativas</small>
                </b>
                <b class="list_b_more">
                    <span>${user.vencidas}</span>
                    <small>Vencida(s)</small>
                </b>
            </a>
        `
        document.querySelector('.js-list-name').innerHTML = valor.map(tpl).join('')
    },
    set lista_de_peca_por_nome(arr) {
        let tpl = peca => `
            <a 
                href="#/peca-detalhes-por-user/${peca.user_id}/${peca.id}" 
                onclick="app.peca_por_nome(${peca.user_id}, ${peca.id}, '${peca.nome}')" 
                class="list__item grid--lista-nomes"
            >
                <b class="list_b_more">
                    <span>${peca.nome}</span>                    
                </b>
                <b class="list_b_more">
                    <span>${peca.total}</span>
                    <small>Ativas</small>
                </b>
                <b class="list_b_more">
                    <span>${peca.vencidas}</span>
                    <small>Vencidas(s)</small>
                </b>            
            </a>
        `
        document.querySelector('.js-peca-por-user').innerHTML = arr.map(tpl).join('')
        let user_id = arr[0].user_id
        let user_name = arr[0].user_name
        document.querySelector('.js-name-peca').innerHTML = user_name
        document.querySelector('.js-link-delivery').innerHTML = `
            <div class="btns">
                <a href="#/entregar/${user_id}" onclick="app.set_user(${user_id})" >Entregar Peça</a>
                <a href="#/devolver/${user_id}" onclick="app.set_user(${user_id})" >Devolver Peça</a>
            </div>
            `
    },
    set peca_por_nome(arr) {

        document.querySelector('.js-name-user-detalhes').innerHTML = arr?.[0]?.user?.nome
        let tpl = post => `
            <a class="list__item ">
                <div class="l-2">
                    <b class="list_b_more">
                        <span>${post.peca.barcode}</span>
                        <small>Código</small>                  
                    </b>
                    <b class="list_b_more">
                        <span>${post.peca.nome}</span>
                        <small>Descricao</small>
                    </b>
                </div>
                <br>
                <div class="l-3">
                    <b class="list_b_more">
                        <span>${post.peca.criado}</span>
                        <small>Inicio</small>
                    </b>    
                    <b class="list_b_more">
                        <span>${post.peca.validade}</span>
                        <small>Validade</small>
                    </b>    
                    <b class="list_b_more">
                        <span>${post.peca.baixa}</span>
                        <small>Baixa</small>
                    </b>       
                </div>                   
            </a>
        `
        document.querySelector('.js-peca-por-user-detalhes-ativas').innerHTML = arr.filter(x => x.status == 'SIM').map(tpl).join('')
        document.querySelector('.js-peca-por-user-detalhes-inativas').innerHTML = arr.filter(x => x.status != 'SIM').map(tpl).join('')
    },
    set set_user(id) {
        document.querySelector('.js-user-entregar').value = id
        document.querySelector('.js-user-devolver').value = id
    },
    fomulario_login: {
        get localizador() {
            return document.f_login.locator.value
        },
        set localizador(valor) {
            document.f_login.locator.value = valor
        },
        get username() {
            return document.f_login.user.value
        },
        set username(valor) {
            document.f_login.user.value = valor
        },
        get pass() {
            return document.f_login.pass.value
        },
    },
    get entregar() {
        let playload = {
            user_id: document.f_entregar.id_user.value,
            barcode: document.f_entregar.barcode.value,
        }
        document.f_entregar.barcode.value = ''
        return playload
    },
    get devolver() {
        let playload = {
            user_id: document.f_devolver.id_user.value,
            barcode: document.f_devolver.barcode.value,
        }
        document.f_devolver.barcode.value = ''
        return playload
    },
    set historico_entregas(arr) {
        let tpl = post => `<span class="alert alert-form ${post.status ? 'alert-form-success' : 'alert-form-error'}">${post.message}</span>`
        document.querySelector('.js-alert-entregar').innerHTML = arr.map(tpl).join('')
    },
    set historico_devolucao(arr) {
        let tpl = post => `<span class="alert alert-form ${post.status ? 'alert-form-success' : 'alert-form-error'}">${post.message}</span>`
        document.querySelector('.js-alert-devolver').innerHTML = arr.map(tpl).join('')
    },
    get form_consultar() {
        return document.f_consultar.s.value
    },
    set form_consultar(value) {
        return document.f_consultar.s.value = value
    },
    set consultar_result(value) {
        this.form_consultar = ''
        if( value.status ) {
            document.querySelector('.js-search-success').innerHTML = `
                <div class="box_label">
                    <div class="grid--detalhes_prod">
                        <div> <b>${value.peca.nome}</b> <small> Descrição </small> </div>
                        <div> <b> ${value.peca.barcode} </b> <small> Código de barras </small> </div>
                    </div>
                    <br>
                    <div class="grid--detalhes_prod">
                        <div> <b>${value.peca.status}</b> <small> Situação </small> </div>
                        <div> <b>${value.user.nome}</b> <small> Etiqueta </small> </div>                    
                    </div>
                    <br>
                    <div class="l-3">
                        <div> <b>${value.peca.criado}</b> <small> Início </small> </div>
                        <div> <b>${value.peca.validade}</b> <small> Validade </small> </div>
                        <div> <b>${value.peca.baixa}</b> <small> Baixa </small> </div>
                    </div>
                </div>
            `
            document.querySelector('.js-fail-consulta').innerHTML = ` `
        } else {
            document.querySelector('.js-fail-consulta').innerHTML = ` `
            if( value.message ) {
                document.querySelector('.js-fail-consulta').innerHTML = `
                <span class="alert alert-form">${value.message}</span>
                `            }
            document.querySelector('.js-search-success').innerHTML = ''
        }
    },
    alert: {
        set login(valor) {
            document.querySelector('.js-alert-login').innerHTML = valor
        }
    },

}

