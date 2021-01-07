export default class {
    init_page = ''
    pages = []
    constructor(init_page = '#/home') {
        this.init_page = init_page
        window.onpopstate = () => this.render()
        this.render()
    }
    add(path, call_back) {
        path = path.replace('#/', '')
        path = path.replace('-', '_')
        if (!this.pages[path]) {
            this.pages[path] = []
        }
        this.pages[path].push(call_back)
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
        let path = url.hash
        path = path.replace('#/', '')
        path = path.replace('-', '_')
        this.pages[path]?.forEach(call_back => {
            call_back()
        })
    }
}