import api from './api.js'
import cache from './cache.js'
export default  {
    async login(localizador, username, pass) {
        let res = await api.login(localizador, username, pass)
        let playload = {
            status: res?.status,
            message: res?.mensagem,
            company: res?.valor?.[0]?.nome ,
            token: cache.token,
            localizador, 
            username,
            logo: `http://191.243.198.108:9194/www/lerlogoemp?dwwelcomemessage=${cache.token}`
        }
        return playload
    }
    // async get_name() {
    //     let res = await this.get_api('/lernomes', {})
    //     res.playload = Array.from( res?.playload?.valor)?.map(user => ({
    //         id: user.autoinc,
    //         departament: user.departamento,
    //         wardrobe: user.armario,
    //         drawer: user.gaveta,
    //         registration: user.matricula,
    //         name: user.nome,
    //         name_tag: user.nomeetiqueta,
    //         order_id: user.predio,
    //         piece_total: user.qua_total,
    //         piece_total_invalid: user.qua_vencidas,
    //         sector: user.setor,
    //         locker_room: user.vestiario,
    //     }))
    //     return res
    // }
    // async get_all_piece_by_name_id(id) {
    //     let res = await this.get_api('/lerpecasnome', { fun: id })
    //     res.playload = Array.from( res?.playload?.valor)?.map(piece => ({
    //         id: piece.peca_peci,
    //         name: piece.descricao_pec,
    //         day_shelf_life: piece.diasvalidade_pec,
    //         total: piece.qua_total,
    //         total_invalid: piece.qua_vencidas
    //     }))
    //     return res
    // }
    // async get_piece_by_name_id(id_name, id_piece) {
    //     let res = await this.get_api('/lerpecasIdentNome', { fun: id_name, pec: id_piece })
    //     res = Array.from( res?.playload?.valor)?.map( pec => ({
    //         status: pec?.ativo_peci == "S" ? 'SIM' : 'NAO',
    //         barcode: pec?.codigobarras_peci,
    //         init: pec?.completadoem_peci,
    //         name: pec?.descricao_pec,
    //         dow: pec?.dtbaixa_peci,
    //         valid: pec?.dtvalidade_peci ? pec?.dtvalidade_peci : '00/00/000',
    //         user: pec?.nome_peci,
    //     }) ) || []
    //     return res
    // }
    // async delivery_piece_by_name_id(id_name, barcode) {
    //     return await this.get_api('/entregarpecaident', { fun: id_name, codbarras: barcode })
    // }
    // async giv_back_piece_by_name_id(id_name, barcode) {
    //     return await this.get_api('/devolverpecaident', { fun: id_name, codbarras: barcode })
    // }
    // async info_piece_by_barcode(barcode) {
    //     let res = await this.get_api('/lerpecaident', { codbarras: barcode })
    //     let playload = res.playload?.valor[0]
    //     return {
    //         next: res.next,
    //         message: res.mensagem,
    //         status: playload?.ativo_peci == 'S' ? 'ATIVO' : 'INATIVO',
    //         id: playload?.autoinc_peci || '***',
    //         barcode: playload?.codigobarras_peci || '***',
    //         init: playload?.completadoem_peci || '***',
    //         dow: playload?.dtbaixa_peci || '***',
    //         valid: playload?.dtvalidade_peci || '***',
    //         user: playload?.funcionario_peci || '***',
    //         name: playload?.nome_peci || '***',
    //         stock: playload?.peca_peci || '***',
    //         description: playload?.descricao_pec || '***',
    //         tag_name: '***'
    //     }
    // }
    // async get_piece() {
    //     let res = await this.get_api('/lerpecas', {})
    //     res.playload = res.playload.valor.map( peca => ({
    //         name: peca.descricao_pec,
    //         id: peca.peca_peci,
    //         estoque: peca.qua_estoque,
    //         uso: peca.qua_uso,
    //         vencidas: peca.qua_vencidas
    //     }) ) 
    //     return res
    // }
    // async get_piece_stock_by_id(id) {
    //     let res = await this.get_api('/lerpecasestoque', { pec: id })
    //     res.playload.valor = Array.from( res.playload.valor)
    //     return res
    // }
    // async get_piece_in_use_by_id(id) {
    //     let res = await this.get_api('/lerpecasuso', { pec: id })
    //     res.playload.valor = Array.from( res.playload.valor)
    //     return res
    // }
    // async locais_de_peca() {
    //     let res = await this.get_api( '/lerlocais',  {} )
    //     if (res.status) {
    //         return res.valor
    //     }
    //     return []
    // }
    // async peca_por_local( local ) {
    //     let res = await this.get_api( '/lerpecaslocal',  { local } )
    //     if (res.status) {
    //         return res.valor
    //     }
    //     return []
    // }
    // async movimentar_peca( local, barcode ) {
    //     let { status, mensagem } = await this.get_api( '/movimentarpecalocal',  { local, barcode } )
    //     return { status, mensagem }
    // }


}