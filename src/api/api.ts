import axios, { AxiosError, AxiosInstance } from 'axios';
import {
  ApiRequestConfig,
  WithAbortFn,
  ApiExecutor,
  ApiExecutorArgs,
  ApiError,
} from './api.types';

const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/api/'
      : '/api/',
};

const axiosInstance = axios.create(axiosParams);

const didAbort = (error: AxiosError) => axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error);
};
const withAbort = <T>(fn: WithAbortFn) => {
  const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
    const originalConfig = args[args.length - 1] as ApiRequestConfig;

    const { abort, ...config } = originalConfig;

    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn<T>(url, body, config);
      } else {
        const [url] = args;
        return await fn<T>(url, config);
      }
    } catch (error: unknown) {
      if (!isApiError(error)) throw error;

      (error as ApiError).aborted = !!didAbort(error);

      throw error;
    }
  };

  return executor;
};

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: ApiRequestConfig = {}) =>
      withAbort<T>(axios.get)(url, config),
    delete: <T>(url: string, config: ApiRequestConfig = {}) =>
      withAbort<T>(axios.delete)(url, config),
    post: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withAbort<T>(axios.post)(url, body, config),
    patch: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withAbort<T>(axios.patch)(url, body, config),
    put: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withAbort<T>(axios.put)(url, body, config),
  };
};

export default api(axiosInstance);
