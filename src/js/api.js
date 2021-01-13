export default class {
    PATH_URI = "http://191.243.198.108:9194"
    set_token(token) { return localStorage.setItem('TOKEN', token) }
    get_token() { return localStorage.getItem('TOKEN') }
    clear_token() { localStorage.removeItem('TOKEN') }
    async get_api(path, params) {
        params = new URLSearchParams(params).toString()
        let token = this.get_token()
        let con = await fetch(`${this.PATH_URI}${path}?dwwelcomemessage=${token}&${params}&`)
        let res = await con.json()
        return {
            next: res.status,
            mensagem: res?.mensagem,
            playload: res
        }
    }
    async login(locator, user, pass) {
        let params = {
            "localizador": locator,
            "login": user,
            "password": pass
        }
        let params_json = JSON.stringify(params)
        let hash_64 = btoa(params_json)
        this.set_token(hash_64)
        let res = await this.get_api('/login', {})
        if (res.next) {
            window.location.href = "#/home"
            this.set_curruent_user(res.playload.valor[0])
        } else {
            this.clear_token()
        }
        return res
    }
    set_curruent_user(user_data) {
        localStorage.setItem('CORRUENT_USER', JSON.stringify(user_data))
    }
    get_curruent_user() {
        return JSON.parse(localStorage.getItem('CORRUENT_USER') || '{}')
    }
    async get_name() {
        let res = await this.get_api('/lernomes', {})
        res.playload = res.playload.valor.map(user => ({
            id: user.autoinc,
            departament: user.departamento,
            wardrobe: user.armario,
            drawer: user.gaveta,
            registration: user.matricula,
            name: user.nome,
            name_tag: user.nomeetiqueta,
            order_id: user.predio,
            piece_total: user.qua_total,
            piece_total_invalid: user.qua_vencidas,
            sector: user.setor,
            locker_room: user.vestiario,
        }))
        return res
    }
    async get_all_piece_by_name_id(id) {
        let res = await this.get_api('/lerpecasnome', { fun: id })
        res.playload = res.playload.valor.map(piece => ({
            id: piece.peca_peci,
            name: piece.descricao_pec,
            day_shelf_life: piece.diasvalidade_pec,
            total: piece.qua_total,
            total_invalid: piece.qua_vencidas
        }))
        return res
    }
    async get_piece_by_name_id(id_name, id_piece) {
        let res = await this.get_api('/lerpecasIdentNome', { fun: id_name, pec: id_piece })
        res = res?.playload?.valor?.map( pec => ({
            status: pec?.ativo_peci == "S" ? 'SIM' : 'NAO',
            barcode: pec?.codigobarras_peci,
            init: pec?.completadoem_peci,
            name: pec?.descricao_pec,
            dow: pec?.dtbaixa_peci,
            valid: pec?.dtvalidade_peci ? pec?.dtvalidade_peci : '00/00/000',
            user: pec?.nome_peci,
        }) ) || []
        return res
    }
    async delivery_piece_by_name_id(id_name, barcode) {
        return await this.get_api('/entregarpecaident', { fun: id_name, codbarras: barcode })
    }
    async giv_back_piece_by_name_id(id_name, barcode) {
        return await this.get_api('/devolverpecaident', { fun: id_name, codbarras: barcode })
    }
    async info_piece_by_barcode(barcode) {
        let res = await this.get_api('/lerpecaident', { codbarras: barcode })
        let playload = res.playload?.valor[0]
        return {
            next: res.next,
            status: playload?.ativo_peci == 'S' ? 'SIM' : 'NAO',
            id: playload?.autoinc_peci || '***',
            barcode: playload?.codigobarras_peci || '***',
            init: playload?.completadoem_peci || '***',
            dow: playload?.dtbaixa_peci || '***',
            valid: playload?.dtvalidade_peci || '***',
            user: playload?.funcionario_peci || '***',
            name: playload?.nome_peci || '***',
            stock: playload?.peca_peci || '***',
            description: '***',
            tag_name: '***'
        }
    }
    async get_piece() {
        let res = await this.get_api('/lerpecas', {})
        res.playload = res.playload.valor.map( peca => ({
            name: peca.descricao_pec,
            id: peca.peca_peci,
            estoque: peca.qua_estoque,
            uso: peca.qua_uso,
            vencidas: peca.qua_vencidas
        }) ) 
        return res
    }
    async get_piece_stock_by_id(id) {
        return await this.get_api('/lerpecasestoque', { pec: id })
    }
    async get_piece_in_use_by_id(id) {
        return await this.get_api('/lerpecasuso', { pec: id })
    }
}