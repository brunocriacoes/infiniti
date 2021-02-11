import api from './adapter.js'
import ui from './ui.js'
import cache from './cache.js'

export default {
    async login() {
        ui.loading = true
        let { localizador, username, pass } = ui.fomulario_login
        let { status, token, logo, company } = await api.login(localizador, username, pass)
        if (status) {
            cache.localizador = localizador
            cache.username = username
            cache.token = token
            cache.corruent_user = { localizador, username, token, logo, company }
            this.info()
            this.go("#/home")
        } else {
            cache.token = null
            ui.alert.login = 'Usuário ou senha estão errados'
        }
        ui.loading = false
    },
    go(path) {
        window.location.href = path
    },
    logout() {
        cache.token = null
        this.go("#/login")
    },
    start() {
        this.info()
        this.cache_login()
    },
    info() {
        ui.corruent_user.company = cache.corruent_user.company
        ui.corruent_user.username = cache.corruent_user.username
        ui.corruent_user.logo = cache.corruent_user.logo
    },
    cache_login() {
        ui.fomulario_login.localizador = cache.localizador
        ui.fomulario_login.username = cache.username
    },
    async lista_de_nomes() {
        let playload = await api.lista_de_nomes()
        ui.lista_de_nomes = playload
    },
    async lista_de_peca_por_nome(id, user_name) {
        let playload = await api.lista_de_peca_por_nome(id, user_name)
        ui.lista_de_peca_por_nome = playload
    },
    async peca_por_nome(id_name, id_piece) {
        let playload = await api.peca_por_nome(id_name, id_piece)
        ui.peca_por_nome = playload
    },
    set_user(id) {
        ui.set_user = id
    },
    async entregar_peca() {
        let { user_id, barcode } = ui.entregar
        let res = await api.entregar_peca(user_id, barcode)
        cache.entregar = res
        ui.historico_entregas = cache.entregar
    },
    async devolver_peca() {
        let { user_id, barcode } = ui.devolver
        let res = await api.devolver_peca(user_id, barcode)
        cache.devolver = res
        ui.historico_devolucao = cache.devolver        
    },
    apagar_consulta() {
        ui.consultar_result = { status: false }
    },
    async consultar_peca() {
        let playload = await api.consultar_peca( ui.form_consultar  )
        ui.consultar_result = playload
    },


    // async render_pecas() {
    //     let pecas = this.store.pecas.map(peca => `
    //         <a href="#/detalhe-peca/${peca.id}" onclick="app.peca_detelhe(${peca.id})" class="list__item grid--acompanhamento">
    //             <span>${peca.name}</span>
    //             <b>${peca.estoque}</b>            
    //         </a>
    //     ` ).join('')
    //     document.querySelector('.js-list-pecas').innerHTML = pecas
    // }

    // async list_names() {
    //     this.load(true)
    //     let res = await api.get_name()
    //     document.querySelector('.js-list-name').innerHTML = res.playload.map(user => `
    //         <a href="#/peca-por-user/${user.id}/${user.name}" onclick="app.peca_detelhe(${user.id}, '${user.name}')" class="list__item grid--lista-nomes">
    //             <span>${user.name}</span>
    //             <b class="list_b_more">
    //                 <span>${user.piece_total}</span>
    //                 <small>Ativas</small>
    //             </b>
    //             <b class="list_b_more">
    //                 <span>${user.piece_total_invalid}</span>
    //                 <small>Vencida(s)</small>
    //             </b>         
    //         </a>
    //     ` ).join('')
    //     this.load(false)
    // }




    // history( tag, message ) {
    //     let list = JSON.parse( localStorage.getItem( tag ) || '[]' )
    //     list = [ message,...list ]
    //     list.slice( 0, 5 )
    //     localStorage.setItem( tag, JSON.stringify(list) )
    //     return list

    // }

    // alert(message, selctor) {
    //     let mem = document.querySelector(`.${selctor}`)
    //     mem.innerHTML = message
    //     mem.removeAttribute('hidden')
    //     setTimeout(() => {
    //         mem.setAttribute('hidden', '')
    //     }, 3000)
    // }
    // async list_all_products() {
    //     this.load(true)
    //     let res = await api.get_piece()
    //     document.querySelector('.js-list-all-product').innerHTML = res.playload.map(pec => `
    //         <a href="#/detalhe-listagem-peca/${pec.id}" onclick="app.stock(${pec.id}, '${pec.name}')" class="list__item grid--listagem-peca">
    //             <span>${pec.name}</span>
    //             <b class="list_b_more">
    //                 <span>${pec.estoque}</span>
    //                 <small>Estoque</small>
    //             </b>       
    //             <b class="list_b_more">
    //                 <span>${pec.uso}</span>
    //                 <small>Ativas</small>
    //             </b>       
    //             <b class="list_b_more">
    //                 <span>${pec.vencidas}</span>
    //                 <small>Vencida(s)</small>
    //             </b>            
    //         </a>
    //     ` ).join('')
    //     this.load(false)
    // }
    // async stock(id, name) {
    //     this.load(true)
    //     let res_estock = await api.get_piece_stock_by_id(id)
    //     let res_use = await api.get_piece_in_use_by_id(id)
    //     document.querySelector('.js-more-pec-tile').innerHTML = name
    //     document.querySelector('.js-list-stock').innerHTML = res_estock?.playload?.valor.map(pec => `
    //         <a class="list__item grid--listagem-peca-em-estoque">
    //             <span>${pec?.codigobarras_peci}</span>
    //             <b class="list_b_more">
    //                 <span>${pec?.dtcadastro_peci}</span>
    //                 <small>Data Cadastro</small>
    //             </b>                
    //         </a>   
    //     `).join('')
    //     document.querySelector('.js-lis-in-use').innerHTML = res_use?.playload?.valor.map(pec => `
    //         <a class="list__item grid--listagem-peca-em-uso">
    //             <b class="list_b_more">
    //                 <span>${pec?.codigobarras_peci}</span>
    //                 <small>Código</small>
    //             </b>
    //             <b class="list_b_more">
    //                 <span>${pec?.nome_peci}</span>
    //                 <small>Nome</small>
    //             </b>
    //             <b class="list_b_more">
    //                 <span>${pec?.completadoem_peci}</span>
    //                 <small>Inicio</small>
    //             </b>
    //             <b class="list_b_more">
    //                 <span>${pec?.dtvalidade_peci}</span>
    //                 <small>Validade</small>
    //             </b>                
    //         </a>
    //     `).join('')
    //     this.load(false)
    // }
    // load(status) {
    //     ui.loading = status
    // }
    // info_user() {    
    //     ui.corruent_user.username = (api.get_curruent_user()).nome2_con
    // }
    // clear_search() {
    //     document.f_consultar.s.value = ''
    //     document.querySelector('.js-search-success').setAttribute('hidden','')
    //     document.querySelector('.js-faill-search').setAttribute('hidden','')
    // }
}
