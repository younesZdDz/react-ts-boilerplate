import axios from 'axios';
import config from '../config';
import { StoreType } from '../configStore';
import { logout } from '../redux/auth/slice';

const interceptor = (store: StoreType): void => {
    axios.interceptors.request.use(
        async (conf) => {
            const token = localStorage.getItem('token');
            if (token) {
                conf.headers['authorization'] = `Bearer ${token}`;
            }
            return conf;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    axios.interceptors.response.use(
        (next) => {
            return Promise.resolve(next);
        },
        async (error) => {
            if (error?.response?.status === 401) {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.put(
                        `${config.API_URI}/api/v1/auth/logout`,
                        {
                            token,
                        },
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        },
                    );
                    localStorage.removeItem('token');
                    localStorage.removeItem('token_expiry_time');
                    localStorage.removeItem('user');
                    store.dispatch(logout());
                }
            }
            return Promise.reject(error);
        },
    );
};
export default {
    interceptor,
};
