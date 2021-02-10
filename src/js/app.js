import api from './adapter.js'
import ui from './ui.js'
import cache from './cache.js'

export default {
    // store = {}
    // constructor() {
    //     (async () => {
    //         if( !this.on_logged() ) return false
    //         await this.render_logo()
    //         await this.load_api()
    //         await this.render_pecas()
    //         await this.list_all_products()
    //         this.consultar()
    //         this.list_names()
    //         this.info_user()
    //     })()
    // }


    // async on_logged() {
    //     if (api.get_token() === null) {
    //         window.location.href = "#/login"
    //         return false
    //     }
    //     return true
    // }
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
    // async load_api() {
    //     this.store.pecas = await api.get_piece().then(res => res.playload)
    // }
    // async render_pecas() {
    //     let pecas = this.store.pecas.map(peca => `
    //         <a href="#/detalhe-peca/${peca.id}" onclick="app.peca_detelhe(${peca.id})" class="list__item grid--acompanhamento">
    //             <span>${peca.name}</span>
    //             <b>${peca.estoque}</b>            
    //         </a>
    //     ` ).join('')
    //     document.querySelector('.js-list-pecas').innerHTML = pecas
    // }
    // async consultar() {
    //     let $form = document.f_consultar
    //     $form.addEventListener('submit', async () => {
    //         this.load(true)
    //         let res = await api.info_piece_by_barcode($form.s.value)
    //         let $box = document.querySelector('.js-search-success')
    //         let $message = document.querySelector('.js-faill-search')
    //         if (res.next) {
    //             $box.removeAttribute('hidden')
    //             $message.setAttribute('hidden', '')
    //         } else {
    //             $message.removeAttribute('hidden')
    //             $message.innerHTML = res.message
    //             $box.setAttribute('hidden', '')
    //         }
    //         document.querySelector('.js-more-pec-title').innerHTML = res.description
    //         document.querySelector('.js-more-pec-barcode').innerHTML = res.barcode
    //         document.querySelector('.js-more-pec-status').innerHTML = res.status
    //         document.querySelector('.js-more-pec-tag-name').innerHTML = res.name
    //         document.querySelector('.js-more-pec-init').innerHTML = res.init
    //         document.querySelector('.js-more-pec-valid').innerHTML = res.valid
    //         document.querySelector('.js-more-pec-dow').innerHTML = res.dow
    //         this.load(false)
    //     })
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
    // go_back() {
    //     let url = new URL( window.location.href )
    //     let parans = url.hash.replace('#/', '')
    //     parans = parans.split('/')
    //     app.peca_detelhe(parans[1], 'trol')
    // }
    // async peca_detelhe(user_id, name = null) {
    //     this.load(true)
    //     let res = await api.get_all_piece_by_name_id(user_id)        

    //     document.querySelector('.js-peca-por-user').innerHTML = res.playload.map(pec => `
    //         <a href="#/peca-detalhes-por-user/${user_id}/${pec.id}" onclick="app.peca_detelhe_user(${user_id}, ${pec.id}, '${name}')" class="list__item grid--lista-nomes">
    //             <b class="list_b_more">
    //                 <span>${pec.name}</span>                    
    //             </b>
    //             <b class="list_b_more">
    //                 <span>${pec.total}</span>
    //                 <small>Ativas</small>
    //             </b>
    //             <b class="list_b_more">
    //                 <span>${pec.total_invalid}</span>
    //                 <small>Vencidas(s)</small>
    //             </b>            
    //         </a>
    //     ` ).join('')
    //     document.querySelector('.js-name-peca').innerHTML = res.playload[0].name
    //     document.querySelector('.js-link-delivery').innerHTML = `
    //     <div class="btns">
    //         <a href="#/entregar/${user_id}" onclick="app.set_user(${user_id})" >Entregar Peça</a>
    //         <a href="#/devolver/${user_id}" onclick="app.set_user(${user_id})" >Devolver Peça</a>
    //     </div>
    //     `
    //     this.load(false)
    // }
    // set_user(id) {
    //     document.querySelector('.js-user-entregar').value = id
    //     document.querySelector('.js-user-devolver').value = id
    // }
    // async peca_detelhe_user(id_func, id_pec, name) {
    //     this.load(true)
    //     let res = await api.get_piece_by_name_id(id_func, id_pec)
    //     if (res.length < 1) {
    //         this.alert('Peças não encontradas.', 'js-alert-not-peca')
    //     }
    //     document.querySelector('.js-name-user-detalhes').innerHTML = res[0].name
    //     document.querySelector('.js-peca-por-user-detalhes-ativas').innerHTML = res.filter(x => x.status == 'SIM').map(pec => `
    //         <a class="list__item ">
    //             <div class="l-2">
    //                 <b class="list_b_more">
    //                     <span>${pec.barcode}</span>
    //                     <small>Código</small>                  
    //                 </b>
    //                 <b class="list_b_more">
    //                     <span>${pec.name}</span>
    //                     <small>Descricao</small>
    //                 </b>
    //             </div>
    //             <br>
    //             <div class="l-3">
    //                 <b class="list_b_more">
    //                     <span>${pec.init}</span>
    //                     <small>Inicio</small>
    //                 </b>    
    //                 <b class="list_b_more">
    //                     <span>${pec.valid}</span>
    //                     <small>Validade</small>
    //                 </b>    
    //                 <b class="list_b_more">
    //                     <span>${pec.dow}</span>
    //                     <small>Baixa</small>
    //                 </b>       
    //             </div>                   
    //         </a>
    //     ` ).join('')
    //     document.querySelector('.js-peca-por-user-detalhes-inativas').innerHTML = res.filter(x => x.status != 'SIM').map(pec => `
    //         <a class="list__item ">
    //             <div class="l-2">
    //                 <b class="list_b_more">
    //                     <span>${pec.barcode}</span>
    //                     <small>Código</small>                  
    //                 </b>
    //                 <b class="list_b_more">
    //                     <span>${pec.name}</span>
    //                     <small>Descricao</small>
    //                 </b>
    //             </div>
    //             <br>
    //             <div class="l-3">
    //                 <b class="list_b_more">
    //                     <span>${pec.init}</span>
    //                     <small>Inicio</small>
    //                 </b>    
    //                 <b class="list_b_more">
    //                     <span>${pec.valid}</span>
    //                     <small>Validade</small>
    //                 </b>    
    //                 <b class="list_b_more">
    //                     <span>${pec.dow}</span>
    //                     <small>Baixa</small>
    //                 </b>       
    //             </div>                   
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
    // async entregar() {
    //     this.load(true)
    //     let $form = document.f_entregar
    //     let res = await api.delivery_piece_by_name_id($form.id_user.value, $form.barcode.value)
    //     this.load(false)
    //     let show_history = this.history( 'ENTREGAR', `<span class="alert alert-form ${res.status ? 'alert-form-success' : 'alert-form-error'}">${res.mensagem}</span>`  )
    //     document.querySelector('.js-alert-entregar').innerHTML =  show_history.join('')
    //     // this.alert(res.mensagem, 'js-alert-entregar')
    //     $form.barcode.value = ''
    // }
    // async devolver() {
    //     let $form = document.f_devolver
    //     this.load(true)
    //     let res = await api.giv_back_piece_by_name_id($form.id_user.value, $form.barcode.value)
    //     this.load(false)
    //     $form.barcode.value = ''
    //     let show_history = this.history( 'DEVOLVER', `<span class="alert alert-form ${res.status ? 'alert-form-success' : 'alert-form-error'}">${res.mensagem}</span>`  )
    //     document.querySelector('.js-alert-devolver').innerHTML =  show_history.join('')
    //     // this.alert(res.mensagem, 'js-alert-devolver')
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
