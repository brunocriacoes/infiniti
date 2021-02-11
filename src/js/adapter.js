import api from './api.js'
import cache from './cache.js'
export default {
    async login(localizador, username, pass) {
        let res = await api.login(localizador, username, pass)
        let playload = {
            status: res?.status,
            message: res?.mensagem,
            company: res?.valor?.[0]?.nome,
            token: cache.token,
            localizador,
            username,
            logo: `http://191.243.198.108:9194/www/lerlogoemp?dwwelcomemessage=${cache.token}`
        }
        return playload
    },
    async lista_de_nomes() {
        let { valor, status } = await api.lista_de_nomes()
        if (status) {
            let playload = valor
            return valor.map(funcionario => ({
                id: funcionario.autoinc,
                nome: funcionario.nome,
                etiqueta: funcionario.nomeetiqueta,
                matricula: funcionario.matricula,
                predio: funcionario.predio,
                vestiario: funcionario.vestiario,
                armario: funcionario.armario,
                gaveta: funcionario.gaveta,
                setor: funcionario.setor,
                departamento: funcionario.departamento,
                total: funcionario.qua_total,
                vencidas: funcionario.qua_vencidas,
            }))
        }
        return []
    },
    async lista_de_peca_por_nome(user_id, peca_id) {
        let { valor, status } = await api.lista_de_peca_por_nome(user_id, peca_id)
        if (status) {
            let playload = valor
            return valor.map(peca => ({
                user_id,
                id: peca.peca_peci,
                nome: peca.descricao_pec,
                validade: peca.diasvalidade_pec,
                total: peca.qua_total,
                vencidas: peca.qua_vencidas,
            }))
        }
        return []
    },
    async peca_por_nome(id_name, id_piece) {
        let { valor, status } = await api.peca_por_nome(id_name, id_piece)
        if (status) {
            let playload = valor
            return valor.map(peca => ({
                id: peca.autoinc_peci,
                user: {
                    id: peca.funcionario_peci,
                    nome: peca.nome_peci,
                    matricula: peca.matricula_peci,
                },
                peca: {
                    id: peca.peca_peci,
                    barcode: peca.codigobarras_peci,
                    status: peca.ativo_peci == "S" ? 'SIM' : 'NAO',
                    predio: peca.predio_peci,
                    vestiario: peca.vestiario_peci,
                    armario: peca.armario_peci,
                    gaveta: peca.gaveta_peci,
                    setor: peca.setor_peci,
                    departamento: peca.departamento_peci,
                    criado: peca.completadoem_peci,
                    validade: peca.dtvalidade_peci,
                    baixa: peca.dtbaixa_peci,
                    nome: peca.descricao_pec,
                    localizacao: peca.localizacao_peci,
                    update: peca.dthrlocalizacao_peci,
                },
            }))
        }
        return []
    },
    async entregar_peca(user_id, barcode) {
        let post = await api.entregar_peca(user_id, barcode)
        return {
            status: post.status,
            message: post.mensagem,
        }

    },
    async devolver_peca(user_id, barcode) {
        let post = await api.devolver_peca(user_id, barcode)
        return {
            status: post.status,
            message: post.mensagem,
        }
    },
    async consultar_peca(barcode) {
        let post = await api.consultar_peca(barcode)
        return {
            status: post?.status || false,
            message: post?.mensagem,
            user: {
                id: post.valor?.[0]?.funcionario_peci,
                nome: post.valor?.[0]?.nome_peci,
                matricula: post.valor?.[0]?.matricula_peci,
            },
            peca: {
                id: post.valor?.[0]?.autoinc_peci,
                barcode: post.valor?.[0]?.codigobarras_peci,
                status: post.valor?.[0]?.ativo_peci == "S" ? "ATIVA" : "INATIVA",
                predio: post.valor?.[0]?.predio_peci,
                vestiario: post.valor?.[0]?.vestiario_peci,
                armario: post.valor?.[0]?.armario_peci,
                gaveta: post.valor?.[0]?.gaveta_peci,
                setor: post.valor?.[0]?.setor_peci,
                departamento: post.valor?.[0]?.departamento_peci,
                criado: post.valor?.[0]?.completadoem_peci,
                validade: post.valor?.[0]?.dtvalidade_peci,
                baixa: post.valor?.[0]?.dtbaixa_peci,
                nome: post.valor?.[0]?.descricao_pec,
                localizacao: post.valor?.[0]?.localizacao_peci,
                update: post.valor?.[0]?.dthrlocalizacao_peci,
            },
        }
    }

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