import ApiService from './ApiService';

class AuthService {

    static login = async (credentials) => {
        return await ApiService.post('/auth/login', credentials);
    }

}

export default AuthService;