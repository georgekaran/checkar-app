import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
});

class Service {
    static get = async (url, opts) => {
        console.log(api);
        const {data} = await api.get(url, opts);
        return data;
    }

    static post = async (url, opts) => {
        const {data} = await api.post(url, opts);
        return data;
    }

    static put = async (url, opts) => {
        const {data} = await api.put(url, opts);
        return data;
    }

    static delete = async (url, opts) => {
        const {data} = await api.delete(url, opts);
        return data;
    }
}

export default Service;