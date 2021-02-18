import Route from './route.js'
import app from './app.js'

const route = new Route('#/home')

globalThis.app = app

app.start()
app.is_logged()

route.add( '/lista-de-nomes', parans => {
    app.lista_de_nomes()
} )

route.add( '/lista-de-pecas', parans => {
    app.lista_pecas()
} )

route.add( '/pecas-por-local', parans => {
    app.locais()
} )

route.add( '/detalhe-listagem-peca', parans => {
    app.estoque(parans[1], 'PEÇA')
} )

route.add( '/peca-por-user', parans => {
    app.lista_de_peca_por_nome(parans[1], parans[2])
} )

route.add( '/peca-detalhes-por-user', parans => {
    app.peca_por_nome(parans[1], parans[2], parans[3] || '' )
} )

route.add( '/lista-pecas-local', parans => {
    app.pecas_por_local( decodeURI(parans[1]) )
} )

route.render()

app.go_back()

window.onpopstate = () => {
    route.render()
    app.go_back()
}