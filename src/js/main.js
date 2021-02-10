import Route from './route.js'
import app from './app.js'

const route = new Route('#/home')

globalThis.app = app
app.start()

route.add('/peca-por-user', function name(params) {
    app.peca_detelhe(params[1])
})
route.render()
window.onpopstate = () => {
    route.render()
}