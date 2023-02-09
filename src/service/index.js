import { resInterceptor } from "./intercepters";
import axios from "axios";

export class NetworkService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
    });
    this.client.interceptors.response.use(
      resInterceptor.onFulfill,
      resInterceptor.onReject
    );
  }

  request({ method, url, data, baseURL = "", config = {} }) {
    return this.client.request({
      method,
      url,
      data,
      baseURL: baseURL || undefined,
      ...config,
    });
  }

  get({ url, config, baseURL }) {
    return this.client.get(url, { ...config, baseURL });
  }

  post({ url, data, config, baseURL }) {
    return this.client.post(url, data, { ...config, baseURL });
  }

  put({ url, data, config, baseURL }) {
    return this.client.put(url, data, { ...config, baseURL });
  }
}

export const client = new NetworkService();
