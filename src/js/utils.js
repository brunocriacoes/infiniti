
function parans() {
    let url = new URL(window.location.href)
    let param = url.hash.replace('#/', '')
    param = param.split('/')
    param = param.map( x => x?.replace('%20', ' ') )
    return param

}

export { parans }
