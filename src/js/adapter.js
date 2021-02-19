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
            logo: `//191.243.198.108:9194/www/lerlogoemp?dwwelcomemessage=${cache.token}`
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
    async lista_de_peca_por_nome(user_id, user_name) {    
        let { valor, status } = await api.lista_de_peca_por_nome(user_id)
        if (status) {
            let playload = valor
            return valor.map(peca => ({
                user_id,
                user_name,
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
    },
    async lista_pecas() {
        let { status, valor } = await api.lista_pecas()
        if (status) {
            let arr = valor
            return arr.map(peca => ({
                id: peca.peca_peci,
                nome: peca.descricao_pec,
                estoque: peca.qua_estoque,
                ativas: peca.qua_uso,
                vencidas: peca.qua_vencidas,
            }))
        }
        return []
    },
    async estoque_de_peca(id, nome) {
        let { status, valor } = await api.estoque_de_peca(id)
        if (status) {
            let arr = valor
            return arr.map(peca => ({
                nome,
                id: peca.autoinc_peci,
                barcode: peca.codigobarras_peci,
                cadastro: peca.dtcadastro_peci,
            }))
        }
        return []
    },
    async pecas_em_uso(id, nome) {
        let { status, valor } = await api.pecas_em_uso(id)
        if (status) {
            let arr = valor
            return arr.map(post => ({
                user: {
                    id: post.funcionario_peci,
                    nome: post.nome_peci,
                    matricula: post.matricula_peci,
                },
                peca: {
                    id: post.peca_peci,
                    barcode: post.codigobarras_peci,
                    status: post.ativo_peci == 'S' ? 'SIM' : 'NAO',
                    nome: post.descricao_pec,
                    predio: post.predio_peci,
                    vestiario: post.vestiario_peci,
                    armario: post.armario_peci,
                    gaveta: post.gaveta_peci,
                    setor: post.setor_peci,
                    departamento: post.departamento_peci,
                    cadastro: post.completadoem_peci,
                    validade: post.dtvalidade_peci,
                    baixa: post.dtbaixa_peci,
                    localizacao: post.localizacao_peci,
                    update: post.dthrlocalizacao_peci,
                },
                id: post.autoinc_peci,
            }))
        }
        return []
    },
    async locais() {
        let { status, valor } = await api.locais()
        if (status) {
            return valor
        }
        return []
    },
    async pecas_por_local(local) {
        let { status, valor } = await api.pecas_por_local(local)
        if (status) {
            let arr = valor
            return arr.map(post => ({
                user: {
                    matricula: post.matricula_peci,
                    nome: post.nome_peci,
                    id: post.funcionario_peci,
                },
                peca: {
                    id: post.peca_peci,
                    barcode: post.codigobarras_peci,
                    status: post.ativo_peci == "S" ? "SIM" : "NAO",
                    predio: post.predio_peci,
                    vestiario: post.vestiario_peci,
                    armario: post.armario_peci,
                    gaveta: post.gaveta_peci,
                    setor: post.setor_peci,
                    departamento: post.departamento_peci,
                    cadastro: post.completadoem_peci,
                    validade: post.dtvalidade_peci,
                    baixa: post.dtbaixa_peci,
                    nome: post.descricao_pec,
                    localizacao: post.localizacao_peci,
                    update: post.dthrlocalizacao_peci,
                },
                id: post.autoinc_peci,
            }))
        }
        return []
    },
    async movimentar_peca(local, barcode) {
        let { status, mensagem } = await api.movimentar_peca(local, barcode)
        return {
            status,
            message: mensagem
        }
    },
    async historico_movimentacao( codbarras, name ) {
        let { status, valor } = await api.historico_movimentacao(codbarras)
        if (status) {
            let arr = valor
            return arr.map(post => ({
                name,
                data: post.dthrmovimento,
                local: post.destino,
                user: post.usuario,
                origem: post.docorigem,
            }))
        }
        return []
    }
}