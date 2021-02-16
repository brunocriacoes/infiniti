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
    console.log( parans )
    app.estoque(parans[1], 'PEÇA')
} )

route.render()

window.onpopstate = () => {
    route.render()
}