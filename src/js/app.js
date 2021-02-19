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
    is_logged() {
        if ( !cache.token ) {
            this.go("#/login")
        }
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
        ui.loading = true
        let playload = await api.lista_de_nomes()
        ui.lista_de_nomes = playload
        ui.loading = false
    },
    async lista_de_peca_por_nome(id, user_name) {
        ui.loading = true
        let playload = await api.lista_de_peca_por_nome(id, user_name)
        ui.lista_de_peca_por_nome = playload
        ui.loading = false
    },
    async peca_por_nome(id_name, id_piece) {
        ui.loading = true
        let playload = await api.peca_por_nome(id_name, id_piece)
        ui.peca_por_nome = playload
        ui.loading = false
    },
    set_user(id) {
        ui.set_user = id
    },
    async entregar_peca() {
        ui.loading = true
        let { user_id, barcode } = ui.entregar
        let res = await api.entregar_peca(user_id, barcode)
        cache.entregar = res
        ui.historico_entregas = cache.entregar
        ui.loading = false
    },
    async devolver_peca() {
        ui.loading = true
        let { user_id, barcode } = ui.devolver
        let res = await api.devolver_peca(user_id, barcode)
        cache.devolver = res
        ui.historico_devolucao = cache.devolver
        ui.loading = false
    },
    apagar_consulta() {
        ui.consultar_result = { status: false }
    },
    async consultar_peca() {
        ui.loading = true
        let playload = await api.consultar_peca(ui.form_consultar)
        ui.consultar_result = playload
        ui.loading = false
    },
    async lista_pecas() {
        ui.loading = true
        let playload = await api.lista_pecas()
        ui.lista_pecas = playload
        ui.loading = false
    },
    async estoque_de_peca(id, peca_nome) {
        ui.loading = true
        let playload = await api.estoque_de_peca(id, peca_nome)
        ui.estoque_de_peca = playload
        ui.loading = false
    },
    async pecas_em_uso(id, peca_nome) {
        ui.loading = true
        let playload = await api.pecas_em_uso(id, peca_nome)
        ui.pecas_em_uso = playload
        ui.loading = false
    },
    estoque(id, peca_nome) {
        this.pecas_em_uso(id, peca_nome)
        this.estoque_de_peca(id, peca_nome)
        ui.nome_peca_estoque = peca_nome
    },
    async locais() {
        ui.loading = true
        let playload = await api.locais()
        ui.locais = playload
        ui.loading = false
    },
    async pecas_por_local(local) {
        local = decodeURI( local )
        ui.loading = true
        ui.btn_mover_peca_data_local = local
        let playload = await api.pecas_por_local(local)
        ui.pecas_por_local_title = local
        ui.pecas_por_local = playload
        if (local != '0 - Sem Movimento' && local != '4 - Lavanderia' && local != '5 - Devolvida') {
            ui.btn_mover_peca = true
        } else {
            ui.btn_mover_peca = false
        }
        ui.loading = false
    },
    set_local($el) {
        ui.form_mover_local = $el.getAttribute('data-local')
    },
    active(el) {
        el.classList.toggle('active')
    },
    async mover_peca() {
        ui.loading = true
        let { local, barcode } = ui.form_move_local
        let playload = await api.movimentar_peca(local, barcode)
        cache.mover = playload
        ui.form_mover_local_barcode = ''
        ui.history_moving = cache.mover
        ui.loading = false
    },
    not_logo( $el ) {
        $el.src = './src/img/logo-default.png'
    },
    go_back() {
        let path = new URL( window.location.href )
        if (path.hash == '#/home') {
            ui.go_back = false
        } else {
            ui.go_back = true
        }
    },
    async historico_movimentacao( barcoded, peca_nome ) {
        ui.loading = true
        let playload = await api.historico_movimentacao(barcoded, peca_nome)
        ui.title_historico = peca_nome
        ui.list_historico = playload
        ui.loading = false
    },
}
