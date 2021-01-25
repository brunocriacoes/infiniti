import API from './api.js'
const api = new API

export default class {
    store = {}
    constructor() {
        (async () => {
            if( !this.on_logged() ) return false
            this.set_data_login()
            await this.render_logo()
            await this.load_api()
            await this.render_pecas()
            await this.list_all_products()
            this.consultar()
            this.list_names()
        })()
    }
    toggle_search() {
        document.querySelector('.js-search-link').classList.toggle('active')
        document.querySelector('.js-search-form').classList.toggle('active')
    }
    search() {
        this.toggle_search()
    }
    set_data_login() {
        let $form = document.f_login   
        $form.locator.value = localStorage.getItem('localizador') || ''
        $form.user.value = localStorage.getItem('login') || ''
    }
    async on_logged() {
        if (api.get_token() === null) {
            window.location.href = "#/login"
            return false
        }
        return true
    }
    async login() {
        let form = document.f_login
        this.load(true)
        let {next} = await api.login(form.locator.value, form.user.value, form.pass.value)
        if( next ) {

            await this.render_logo()
            await this.load_api()
            await this.render_pecas()
            await this.list_all_products()
            this.consultar()
            this.list_names()
        }
        this.load(false)
    }
    logout() {
        api.clear_token()
        window.location.href = "#/login"
    }
    render_logo() {
        let base = 'http://191.243.198.108:9194/www/lerlogoemp?dwwelcomemessage='
        document.querySelector('.js-logo').src = base + api.get_token()
    }
    async load_api() {
        this.store.pecas = await api.get_piece().then(res => res.playload)
    }
    async render_pecas() {
        let pecas = this.store.pecas.map(peca => `
            <a href="#/detalhe-peca/${peca.id}" onclick="app.peca_detelhe(${peca.id})" class="list__item grid--acompanhamento">
                <span>${peca.name}</span>
                <b>${peca.estoque}</b>            
            </a>
        ` ).join('')
        document.querySelector('.js-list-pecas').innerHTML = pecas
    }

    async consultar() {
        let $form = document.f_consultar
        $form.addEventListener('submit', async () => {
            this.load(true)
            let res = await api.info_piece_by_barcode($form.s.value)
            let $box = document.querySelector('.js-search-success')
            let $message = document.querySelector('.js-faill-search')
            if (res.next) {
                $box.removeAttribute('hidden')
                $message.setAttribute('hidden', '')
            } else {
                $message.removeAttribute('hidden')
                $message.innerHTML = res.message
                $box.setAttribute('hidden', '')
            }
            document.querySelector('.js-more-pec-title').innerHTML = res.description
            document.querySelector('.js-more-pec-barcode').innerHTML = res.barcode
            document.querySelector('.js-more-pec-status').innerHTML = res.status
            document.querySelector('.js-more-pec-tag-name').innerHTML = res.name
            document.querySelector('.js-more-pec-init').innerHTML = res.init
            document.querySelector('.js-more-pec-valid').innerHTML = res.valid
            document.querySelector('.js-more-pec-dow').innerHTML = res.dow
            this.load(false)
        })
    }
    async list_names() {
        this.load(true)
        let res = await api.get_name()
        document.querySelector('.js-list-name').innerHTML = res.playload.map(user => `
            <a href="#/peca-por-user/${user.id}/${user.name}" onclick="app.peca_detelhe(${user.id}, '${user.name}')" class="list__item grid--lista-nomes">
                <span>${user.name}</span>
                <b class="list_b_more">
                    <span>${user.piece_total}</span>
                    <small>Em Uso</small>
                </b>
                <b class="list_b_more">
                    <span>${user.piece_total_invalid}</span>
                    <small>Vencida(s)</small>
                </b>         
            </a>
        ` ).join('')
        this.load(false)
    }
    async peca_detelhe(user_id, name) {
        this.load(true)
        let res = await api.get_all_piece_by_name_id(user_id)
        document.querySelector('.js-name-user').innerHTML = name

        document.querySelector('.js-peca-por-user').innerHTML = res.playload.map(pec => `
            <a href="#/peca-detalhes-por-user/${user_id}/${pec.id}" onclick="app.peca_detelhe_user(${user_id}, ${pec.id}, '${name}')" class="list__item grid--lista-nomes">
                <b class="list_b_more">
                    <span>${pec.name}</span>                    
                </b>
                <b class="list_b_more">
                    <span>${pec.total}</span>
                    <small>Em Uso</small>
                </b>
                <b class="list_b_more">
                    <span>${pec.total_invalid}</span>
                    <small>Vencidas(s)</small>
                </b>            
            </a>
        ` ).join('')
        document.querySelector('.js-link-delivery').innerHTML = `
        <div class="btns">
            <a href="#/entregar/${user_id}" onclick="app.set_user(${user_id})" >Entregar Peça</a>
            <a href="#/devolver/${user_id}" onclick="app.set_user(${user_id})" >Devolver Peça</a>
        </div>
        `
        this.load(false)
    }
    set_user(id) {
        document.querySelector('.js-user-entregar').value = id
        document.querySelector('.js-user-devolver').value = id
    }
    async peca_detelhe_user(id_func, id_pec, name) {
        this.load(true)
        let res = await api.get_piece_by_name_id(id_func, id_pec)
        if (res.length < 1) {
            this.alert('Peças não encontradas.', 'js-alert-not-peca')
        }
        document.querySelector('.js-name-user-detalhes').innerHTML = name
        document.querySelector('.js-peca-por-user-detalhes-ativas').innerHTML = res.filter(x => x.status == 'SIM').map(pec => `
            <a class="list__item ">
                <div class="l-2">
                    <b class="list_b_more">
                        <span>${pec.barcode}</span>
                        <small>Código</small>                  
                    </b>
                    <b class="list_b_more">
                        <span>${pec.name}</span>
                        <small>Descricao</small>
                    </b>
                </div>
                <br>
                <div class="l-3">
                    <b class="list_b_more">
                        <span>${pec.init}</span>
                        <small>Inicio</small>
                    </b>    
                    <b class="list_b_more">
                        <span>${pec.valid}</span>
                        <small>Validade</small>
                    </b>    
                    <b class="list_b_more">
                        <span>${pec.dow}</span>
                        <small>Baixa</small>
                    </b>       
                </div>                   
            </a>
        ` ).join('')
        document.querySelector('.js-peca-por-user-detalhes-inativas').innerHTML = res.filter(x => x.status != 'SIM').map(pec => `
            <a class="list__item ">
                <div class="l-2">
                    <b class="list_b_more">
                        <span>${pec.barcode}</span>
                        <small>Código</small>                  
                    </b>
                    <b class="list_b_more">
                        <span>${pec.name}</span>
                        <small>Descricao</small>
                    </b>
                </div>
                <br>
                <div class="l-3">
                    <b class="list_b_more">
                        <span>${pec.init}</span>
                        <small>Inicio</small>
                    </b>    
                    <b class="list_b_more">
                        <span>${pec.valid}</span>
                        <small>Validade</small>
                    </b>    
                    <b class="list_b_more">
                        <span>${pec.dow}</span>
                        <small>Baixa</small>
                    </b>       
                </div>                   
            </a>
        ` ).join('')
        this.load(false)
    }
    async entregar() {
        this.load(true)
        let $form = document.f_entregar
        let res = await api.delivery_piece_by_name_id($form.id_user.value, $form.barcode.value)
        this.load(false)
        this.alert(res.mensagem, 'js-alert-entregar')
    }
    async devolver() {
        let $form = document.f_devolver
        this.load(true)
        let res = await api.giv_back_piece_by_name_id($form.id_user.value, $form.barcode.value)
        this.load(false)
        this.alert(res.mensagem, 'js-alert-devolver')
    }
    alert(message, selctor) {
        let mem = document.querySelector(`.${selctor}`)
        mem.innerHTML = message
        mem.removeAttribute('hidden')
        setTimeout(() => {
            mem.setAttribute('hidden', '')
        }, 3000)
    }
    async list_all_products() {
        this.load(true)
        let res = await api.get_piece()
        document.querySelector('.js-list-all-product').innerHTML = res.playload.map(pec => `
            <a href="#/detalhe-listagem-peca/${pec.id}" onclick="app.stock(${pec.id}, '${pec.name}')" class="list__item grid--listagem-peca">
                <span>${pec.name}</span>
                <b class="list_b_more">
                    <span>${pec.estoque}</span>
                    <small>Estoque</small>
                </b>       
                <b class="list_b_more">
                    <span>${pec.uso}</span>
                    <small>Em uso</small>
                </b>       
                <b class="list_b_more">
                    <span>${pec.vencidas}</span>
                    <small>Vencida(s)</small>
                </b>            
            </a>
        ` ).join('')
        this.load(false)
    }
    async stock(id, name) {
        this.load(true)
        let res_estock = await api.get_piece_stock_by_id(id)
        let res_use = await api.get_piece_in_use_by_id(id)
        document.querySelector('.js-more-pec-tile').innerHTML = name
        document.querySelector('.js-list-stock').innerHTML = res_estock?.playload?.valor.map(pec => `
            <a class="list__item grid--listagem-peca-em-estoque">
                <span>${pec?.codigobarras_peci}</span>
                <b class="list_b_more">
                    <span>${pec?.dtcadastro_peci}</span>
                    <small>Data Cadastro</small>
                </b>                
            </a>   
        `).join('')

        document.querySelector('.js-lis-in-use').innerHTML = res_use?.playload?.valor.map(pec => `
            <a class="list__item grid--listagem-peca-em-uso">
                <b class="list_b_more">
                    <span>${pec?.codigobarras_peci}</span>
                    <small>Código</small>
                </b>
                <b class="list_b_more">
                    <span>${pec?.nome_peci}</span>
                    <small>Nome</small>
                </b>
                <b class="list_b_more">
                    <span>${pec?.completadoem}</span>
                    <small>Inicio</small>
                </b>
                <b class="list_b_more">
                    <span>${pec?.dtvalidade_peci}</span>
                    <small>Validade</small>
                </b>                
            </a>
        `).join('')
        this.load(false)
    }
    load(status) {
        if (status) {
            document.querySelector('.pre-load').removeAttribute('hidden')
        } else {
            document.querySelector('.pre-load').setAttribute('hidden', '')
        }
    }
}
