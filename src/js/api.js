export default class {
    PATH_URI = "http://191.243.198.108:9194"
    set_token(token) { return localStorage.setItem('TOKEN', token) }
    get_token() { return localStorage.getItem('TOKEN') || '' }
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
        return await this.get_api('/login', {})
    }
    async get_name() {
        let res = await this.get_api('/lernomes', {})
        res.playload = res.playload.valor.map( user => ({
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
        }) )
        return res
    }
    async get_all_piece_by_name_id(id) {
        let res = await this.get_api('/lerpecasnome', { fun: id })
        res.playload = res.playload.RESULT[0].valor.map( piece => ({
            id: piece.peca_peci, 
            name: piece.descricao_pec, 
            day_shelf_life: piece.diasvalidade_pec, 
            total: piece.qua_total, 
            total_invalid:piece.qua_vencidas            
        }) )
        return res
    }
    async get_piece_by_name_id(id_name, id_piece) {
        return await this.get_api('/lerpecasIdentNome', { fun: id_name, pec: id_piece })
    }
    async delivery_piece_by_name_id(id_name, barcode) {
        return await this.get_api('/entregarpecaident', { fun: id_name, codbarras: barcode })
    }
    async giv_back_piece_by_name_id(id_name, barcode) {
        return await this.get_api('/devolverpecaident', { fun: id_name, codbarras: barcode })
    }
    async info_piece_by_barcode(barcode) {
        return await this.get_api('/lerpecaident', { codbarras: barcode })
    }
    async get_piece() {
        return await this.get_api('/lerpecas', {})
    }
    async get_piece_stock_by_id( id ) {
        return await this.get_api('/lerpecasestoque', { pec: id })
    }
    async get_piece_in_use_by_id( id ) {
        return await this.get_api('/lerpecasuso', { pec: id })
    }
}