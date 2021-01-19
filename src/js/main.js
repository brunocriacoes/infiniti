import Route from './route.js'
import APP from './app.js'

const route = new Route('#/home')

globalThis.app = new APP

// route.add( '/peca-por-user', param => {
//     app.peca_detelhe(param[0], param[1])
// } )
// route.add( '/peca-detalhes-por-user', param => {
//     app.peca_detelhe_user(param[0], param[1])
// } )
// route.add( '/entregar', param => {
//     app.set_user(param[0])
// } )
// route.add( '/devolver', param => {
//     app.set_user(param[0])
// } )

route.render()
window.onpopstate = () => {
    route.render()
}