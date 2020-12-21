export default class {
    PATH_URI = "http://191.243.198.108:9192"
    set_token(token) { return localStorage.setItem('TOKEN', token) }
    get_token() { return localStorage.getItem('TOKEN') || '' }
    clear_token() { localStorage.removeItem('TOKEN') }
    async get_api(path, params) {
        let params = new URLSearchParams(params).toString()
        let token = this.get_token()
        let con = await fetch(`${this.PATH_URI}${path}?dwwelcomemessage=${token}&${params}`)
        let res = await con.json()
        return {
            next: true,
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
        return await this.get_api('/lernomes', {})
    }
    async get_all_piece_by_name_id(id) {
        return await this.get_api('/lerpecasnome', { fun: id })
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