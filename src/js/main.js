import Route from './route.js'
import APP from './app.js'

const route = new Route('#/home')

globalThis.app = new APP


route.render()
window.onpopstate = () => {
    route.render()
}