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
        let playload = await api.consultar_peca(ui.form_consultar)
        ui.consultar_result = playload
    },
    async lista_pecas() {
        let playload = await api.lista_pecas()
        ui.lista_pecas = playload
    },
    async estoque_de_peca(id, peca_nome) {
        let playload = await api.estoque_de_peca(id, peca_nome)
        ui.estoque_de_peca = playload
    },
    async pecas_em_uso(id, peca_nome) {
        let playload = await api.pecas_em_uso(id, peca_nome)
        ui.pecas_em_uso = playload
    },
    estoque(id, peca_nome) {
        this.pecas_em_uso(id, peca_nome)
        this.estoque_de_peca(id, peca_nome)
        ui.nome_peca_estoque = peca_nome
    },
    async locais() {
        let playload = await api.locais()
        ui.locais = playload
    },
    async pecas_por_local(local) {
        ui.btn_mover_peca_data_local = local
        let playload = await api.pecas_por_local(local)
        ui.pecas_por_local_title = local
        ui.pecas_por_local = playload
        if (local != '0 - Sem Movimento' && local != '4 - LAVANDERIA' && local != '5 - DEVOLVIDAS') {
            ui.btn_mover_peca = true
        } else {
            ui.btn_mover_peca = false
        }
    },
    set_local($el) {
        ui.form_mover_local = $el.getAttribute('data-local')
    },
    active(el) {
        el.classList.toggle('active')
    },
    async mover_peca() {
        let { local, barcode } = ui.form_move_local
        let playload = await api.movimentar_peca(local, barcode)
        cache.mover = playload
        ui.form_mover_local_barcode = ''
        ui.history_moving = cache.mover
    },
    not_logo( $el ) {
        $el.src = './src/img/logo-default.png'
    }
}
