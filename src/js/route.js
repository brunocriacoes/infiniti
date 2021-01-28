export default class {
    init_page = ''
    pages = []
    constructor(init_page = '#/home') {
        this.init_page = init_page
        this.render()
    }
    add(path, call_back) {
        if (!this.pages[path]) {
            this.pages[path] = []
        }
        this.pages.push({
            path,
            call_back
        })
    }
    render() {
        let url = new URL(window.location.href)
        if (url.hash.length < 2) {
            window.location.href = this.init_page
        }
        let all_route = document.querySelectorAll('[data-route]')
        all_route = Array.from(all_route)
        all_route.forEach($routre => {
            let is_route = $routre.getAttribute('data-route');
            if (url.hash.indexOf(is_route) !== -1 ) {
                $routre.removeAttribute('hidden')
            } else {
                $routre.setAttribute('hidden', '')
            }
        })
        this.pages.forEach(hook => {
            if( window.location.href.indexOf(hook.path) !== -1 ) {
                let param = url.hash.replace('#/', '')
                param = param.split('/')
                param = param.map( x => x?.replace('%20', ' ') )
                hook.call_back( param )
            }
        })
    }
}