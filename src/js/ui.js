import { parans } from './utils.js'

export default {
    corruent_user: {
        set username(valor) {
            document.querySelector('.js-username').innerHTML = valor
        },
        set company(valor) {
            document.querySelector('.js-company').innerHTML = valor
        },
        set logo(valor) {
            if(valor) {
                document.querySelector('.js-logo').src = valor
            }
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
        let data_default = parans() 
        let user_id = arr[0]?.user_id || data_default[1]
        let user_name = arr[0]?.user_name || data_default[2]
        document.querySelector('.js-name-peca').innerHTML = user_name?.replace( /%20/gi, ' ' )
        document.querySelector('.js-name-peca-menu').innerHTML = user_name?.replace( /%20/gi, ' ' )
        document.querySelector('.js-link-delivery').innerHTML = `
            <div class="btns">
                <a href="#/entregar/${user_id}" onclick="app.set_user(${user_id})" >Entregar Peça</a>
                <a href="#/devolver/${user_id}" onclick="app.set_user(${user_id})" >Devolver Peça</a>
            </div>
            `
    },
    set peca_por_nome(arr) {
        document.querySelector('.js-nome-da-peca').innerHTML = arr?.[0]?.peca?.nome
        document.querySelector('.js-name-user-detalhes').innerHTML = arr?.[0]?.user?.nome
        document.querySelector('.js-name-user-detalhes-menu').innerHTML = arr?.[0]?.user?.nome
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
        document.querySelector('.js-peca-por-user-detalhes-ativas').innerHTML = arr.filter(x => x.peca.status == 'SIM').map(tpl).join('')
        document.querySelector('.js-peca-por-user-detalhes-inativas').innerHTML = arr.filter(x => x.peca.status != 'SIM').map(tpl).join('')
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
            id_motivo: document.f_entregar.id_motivo.value,
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
        if (value.status) {
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
                <div class="space"></div>
                <a class="btn-historico" href="#/historico-movimentacao/${value.peca.barcode}/${value.peca.nome}" conclick="app.historico_movimentacao('${value.peca.barcode}', '${value.peca.nome}')"> MOVIMENTAÇÃO </a>
            `
            document.querySelector('.js-fail-consulta').innerHTML = ` `
        } else {
            document.querySelector('.js-fail-consulta').innerHTML = ` `
            if (value.message) {
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
    set lista_pecas(arr) {
        let tpl = peca => `
            <a 
                href="#/detalhe-listagem-peca/${peca.id}/${peca.nome}" 
                onclick="app.estoque(${peca.id}, '${peca.nome}')" 
                class="list__item grid--listagem-peca"
            >
                <span>${peca.nome}</span>
                <b class="list_b_more">
                    <span>${peca.estoque}</span>
                    <small>Estoque</small>
                </b>       
                <b class="list_b_more">
                    <span>${peca.ativas}</span>
                    <small>Ativas</small>
                </b>       
                <b class="list_b_more">
                    <span>${peca.vencidas}</span>
                    <small>Vencida(s)</small>
                </b>            
            </a>
        `
        document.querySelector('.js-list-all-product').innerHTML = arr.map(tpl).join('')
    },
    set estoque_de_peca(arr) {
        let tpl_em_estoque = peca => `
            <a class="list__item grid--listagem-peca-em-estoque">
                <span>${peca?.barcode}</span>
                <b class="list_b_more">
                    <span>${peca?.cadastro}</span>
                    <small>Data Cadastro</small>
                </b>                
            </a>
        `
        document.querySelector('.js-list-stock').innerHTML = arr.map(tpl_em_estoque).join('')
    },
    set nome_peca_estoque(value) {
        document.querySelector('.js-more-pec-tile').innerHTML = decodeURI(value) 
        document.querySelector('.js-more-pec-tile-menu').innerHTML = decodeURI(value)
    },
    set pecas_em_uso(arr) {
        let tpl = post => `
            <a class="list__item grid--listagem-peca-em-uso">
                <b class="list_b_more">
                    <span>${post.peca.barcode}</span> <small> Código </small>
                </b>
                <b class="list_b_more">
                    <span>${post.user.nome}</span> <small> Nome </small>
                </b>
                <b class="list_b_more">
                    <span>${post.peca.cadastro}</span> <small> Inicio </small>
                </b>
                <b class="list_b_more">
                    <span>${post.peca.validade}</span> <small> Validade </small>
                </b>                
            </a>
        `
        document.querySelector('.js-lis-in-use').innerHTML = arr.map(tpl).join('')
    },
    set locais(arr) {
        let tpl = local => `
            <a 
                href="#/lista-pecas-local/${local.localizacao}"
                class="list__item grid--listagem-locais"
                onclick="app.pecas_por_local( '${local.localizacao}' )"
            >
                <b class="list_b_more">
                    <span>${local.localizacao}</span> <small> Localização </small>
                </b>  
                <b class="list_b_more">
                    <span>${local.quantidade}</span> <small> Quantidade </small>
                </b>                
            </a>
        `
        document.querySelector('.js-list-locais').innerHTML = arr.map(tpl).join('')
    },
    set pecas_por_local_title(value) {
        document.querySelector('.js-title-peca-por-local').innerHTML = value
        document.querySelector('.js-title-peca-por-local-menu').innerHTML = value
    },
    set pecas_por_local(arr) {
        let tpl = post => `
            <div class="box-list-locais" onclick="app.active(this)" >
                <div class="grid--list-locais">
                    <div class="line-more" > <span> ${post.peca.barcode} </span> <small> Código </small> </div>
                    <div class="line-more" > <span> ${post.peca.nome} </span> <small> Nome </small> </div>
                    <div class="icon ico--more"></div>
                </div>
                <div class="more">
                    <span> <b>Funcionario</b>: ${post.user.nome} - ${post.user.matricula} </span>
                    <span> <b>Status</b>: ${post.peca.status} </span>
                    <span> <b>Prédio</b>: ${post.peca.predio} </span>
                    <span> <b>Vestiario</b>: ${post.peca.vestiario} </span>
                    <span> <b>Armario</b>: ${post.peca.armario} </span>
                    <span> <b>Gaveta</b>: ${post.peca.gaveta} </span>
                    <span> <b>Setor</b>: ${post.peca.setor} </span>
                    <span> <b>Departamento</b>: ${post.peca.departamento} </span>
                    <span> <b>Cadastro</b>: ${post.peca.cadastro} </span>
                    <span> <b>Validade</b>: ${post.peca.validade} </span>
                    <span> <b>Baixa</b>: ${post.peca.baixa} </span>       
                </div>
            </div>
        `
        document.querySelector('.js-lista-move-pecas').innerHTML = arr.map(tpl).join('')
    },
    set btn_mover_peca(status) {
        let btn = document.querySelector('.js-btn-move-peca')
        if (status) {
            btn.removeAttribute('hidden')
        } else {
            btn.setAttribute('hidden', '')
        }
    },
    set btn_mover_peca_data_local(local) {
        document.querySelector('.js-btn-move-peca').setAttribute('data-local', local)
    },
    set form_mover_local(value) {
        document.form_move_local.local.value = value
    },
    set form_mover_local_barcode(value) {
        document.form_move_local.barcode.value = value
    },
    get form_move_local() {
        return {
            local: document.form_move_local.local.value,
            barcode: document.form_move_local.barcode.value,
        }
    },
    set history_moving(arr) {
        let tpl = post => `<span class="alert alert-form ${post.status ? 'alert-form-success' : 'alert-form-error'}">${post.message}</span>`
        document.querySelector('.js-history-moving').innerHTML = arr.map(tpl).join('')
    },
    set go_back( truefalse ) {
        let $bt_pdf = document.querySelector('.js-ico-pdf')
        let $bt_logout = document.querySelector('.js-ico-logout')
        let $btn = document.querySelector('.js-go-back')
        if ( truefalse ) {
            $btn.removeAttribute( 'hidden' )
            $bt_pdf.removeAttribute( 'hidden' )
            $bt_logout.setAttribute( 'hidden', '' )
        } else {
            $btn.setAttribute( 'hidden', '' )
            $bt_pdf.setAttribute( 'hidden', '' )
            $bt_logout.removeAttribute( 'hidden' )
        }
    },
    set title_historico( value ) {
        document.querySelector('.js-title-historico').innerHTML = value
        document.querySelector('.js-title-historico-menu').innerHTML = value
    },
    set list_historico( arr ) {
        let tpl = post => `
            <a class="list__item grid--listagem-peca-em-uso">
                <b class="list_b_more">
                    <span>${post.data}</span> <small> Data </small>
                </b>
                <b class="list_b_more">
                    <span>${post.local}</span> <small> Local </small>
                </b>
                <b class="list_b_more">
                    <span>${post.user}</span> <small> User </small>
                </b>
                <b class="list_b_more">
                    <span>${post.origem}</span> <small> Origem </small>
                </b>                
            </a>
        `
        document.querySelector('.js-historico-list').innerHTML = arr.map(tpl).join('')
    },
    set motivos( arr ) {
        document.querySelector('.js-motivos').innerHTML = arr.map( post => `<option value="${post.id}">${post.text}</option>` ).join('')
    },

}

