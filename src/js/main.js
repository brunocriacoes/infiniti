import Route from './route.js'
import app from './app.js'

const route = new Route('#/home')

globalThis.app = app

app.start()
app.is_logged()

route.render()

window.onpopstate = () => {
    route.render()
}