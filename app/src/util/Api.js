import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'

class Auth {

    static PREFIX_URL = "/auth"

    static signin(data) {
        axios.post(BASE_URL + PREFIX_URL + "/signin", data)
            .then(resp => {
                
            }).catch(e => {
                
            })
    }
}

export class Api {

    static auth = Auth;
}