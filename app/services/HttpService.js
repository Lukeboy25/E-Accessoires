import Axios from 'axios';
import { APP_URL, DEMO_URL } from 'react-native-dotenv';

import { store } from '../../App';
import { logOut, requestTokenBE, requestTokenNL } from '../store/token/tokenActions';

class HttpService {
    constructor(language) {
        this.language = language;
        this.instance = Axios.create({
            baseURL: APP_URL,
            headers: {
                Accept: 'application/vnd.retailer.v7+json',
                'Content-Type': 'application/vnd.retailer.v7+json',
            },
        });
        this.instance.interceptors.request.use(
            (request) => {
                const token = language === 'NL' ? store.getState().token.token : store.getState().token.tokenBE;
                request.headers = request.headers || {};
                request.headers.Authorization = `Bearer ${token}`;

                return request;
            },
            (error) => error,
        );
        this.instance.interceptors.response.use(
            (response) => {
                if (response.data.status === 'success') {
                    response.data = response.data.data;
                }

                return response;
            },
            async (error) => {
                if (error?.response?.status === 401) {
                    const token = language === 'NL' ? await store.dispatch(requestTokenNL()) : await store.dispatch(requestTokenBE());
                    if (token) {
                        return await this.instance.request(error.config);
                    }
                } else {
                    store.dispatch(logOut());
                }
            },
        );
    }

    async head(url, config) {
        return (await this.instance.head(url, config)).data;
    }

    async get(url, config) {
        return (await this.instance.get(url, config)).data;
    }

    async post(url, data, config) {
        return (await this.instance.post(url, data, config)).data;
    }

    async patch(url, data, config) {
        return (await this.instance.patch(url, data, config)).data;
    }

    async put(url, data, config) {
        return (await this.instance.put(url, data, config)).data;
    }

    async delete(url, config) {
        return (await this.instance.delete(url, config)).data;
    }
}

export default HttpService;
