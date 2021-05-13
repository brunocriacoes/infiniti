import cache from './cache.js'
export default {
    async post(path, params) {
        let uri = cache.host
        params.dwwelcomemessage = cache.token
        let paser_params = new URLSearchParams(params).toString()
        try {
            return await (await fetch(`${uri}${path}?${paser_params}`)).json()
        } catch (error) {
            return await { status: false, message: 'O servidor demorou a responder, tente novamente mais tarde' }
        }
    },
    welcome(localizador, username, pass) {
        let playload = {
            "localizador": localizador,
            "login": username,
            "password": pass
        }
        let token = btoa(JSON.stringify(playload))
        cache.token = token
        return token
    },
    async login(localizador, username, pass) {
        await this.licenca(localizador)
        this.welcome(localizador, username, pass)
        return await this.post('/login', {})
    },
    async lista_de_nomes() {
        return await this.post('/lernomes', {})
    },
    async lista_de_peca_por_nome(id) {
        return await this.post('/lerpecasnome', { fun: id })
    },
    async peca_por_nome(id_name, id_piece) {
        return await this.post('/lerpecasIdentNome', { fun: id_name, pec: id_piece })
    },
    async entregar_peca(id_name, barcode) {
        return await this.post('/entregarpecaident', { fun: id_name, codbarras: barcode })
    },
    async devolver_peca(id_name, barcode) {
        return await this.post('/devolverpecaident', { fun: id_name, codbarras: barcode })
    },
    async consultar_peca(barcode) {
        return await this.post('/lerpecaident', { codbarras: barcode })
    },
    async lista_pecas() {
        return await this.post('/lerpecas', {})
    },
    async estoque_de_peca(id) {
        return await this.post('/lerpecasestoque', { pec: id })
    },
    async pecas_em_uso(id) {
        return await this.post('/lerpecasuso', { pec: id })
    },
    async locais() {
        return await this.post('/lerlocais', {})
    },
    async pecas_por_local(local) {
        return await this.post('/lerpecaslocal', { local })
    },
    async movimentar_peca(local, codbarras) {
        return await this.post('/movimentarpecalocal', { local, codbarras })
    },
    async historico_movimentacao(codbarras) {
        return await this.post('/lermovimentacaopeca', { codbarras })
    },
    async lista_nome_entregar_motivos() {
        return await this.post('/lermotivos', {})
    },
    async lista_nome_devolver(barcode, id_funcionario, id_motivo) {
        return await this.post('/devolverpecaident', { codbarras: barcode, fun: id_funcionario, mot: id_motivo, })
    },
    async licenca(localizador) {
        try {
            if( !cache.token ) {
                let res = await fetch(`//licenca.infinitisistemas.com.br/localizaregistro.php?localizador=${localizador}`)
                res = await res.json()
                res = res[0]
                cache.host = `//${res.HOST_REMOTO}:${res.PORTA}`
            }
        } catch (error) {
            
        }
    },

}