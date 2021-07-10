import Axios from 'axios';
import { store } from '../../App';
import { logOut, requestToken } from '../store/token/actions';
import { APP_URL } from 'react-native-dotenv';

class HttpService {
  constructor() {
    this.instance = Axios.create({
      baseURL: APP_URL,
      headers: {
        Accept: 'application/vnd.retailer.v3+json',
      },
    });
    this.instance.interceptors.request.use(
      (request) => {
        const token = store.getState().token.token;
        request.headers = request.headers || {};
        request.headers.Authorization = `Bearer ${token}`;
        return request;
      },
      (error) => {
        return error;
      }
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
          if (!/refresh/.test(error.config.url)) {
            console.error('Unauthorized:', error);
            const token = await store.dispatch(requestToken());
            if (token) {
              return (await this.instance.request(error.config)).data;
            }
            return;
          } else {
            store.dispatch(logOut());
            return;
          }
        }
        throw error;
      }
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

export default new HttpService();
