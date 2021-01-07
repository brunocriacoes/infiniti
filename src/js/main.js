import API from './api.js'
import Route from './route.js'

const api = new API
const route = new Route('#/home')


api.login( 'INFINITI_DEMO', 'AMBEV', 'AMBEV' ).then( res => console.log( 'LOGIN: ', res) )
// api.get_name().then( res => console.log('LIST NAME', res) )
// api.get_all_piece_by_name_id( 4228 ).then( res => console.log('LIST PIECE BY NAME', res) )
// api.get_piece_by_name_id( 422, 31 ).then( res => console.log('ALL PIECE BY NAME', res) )