import { ENV } from "@/constants/env";
import axios, { AxiosRequestConfig } from "axios";
const instance = axios.create();
export const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance.get<T>(`${ENV.API_ROOT}${url}`, config).then(({ data }) => data),
  post: <T, Q>(
    url: string,
    body?: T,
    config?: AxiosRequestConfig
  ): Promise<Q> =>
    instance
      .post<Q>(`${ENV.API_ROOT}${url}`, body, config)
      .then(({ data }) => data),
  put: <T, Q>(url: string, body?: T): Promise<Q> =>
    instance.put<Q>(`${ENV.API_ROOT}${url}`, body).then(({ data }) => data),
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance
      .delete<T>(`${ENV.API_ROOT}${url}`, config)
      .then(({ data }) => data),
  deleteWithData: <T, Q>(url: string, body?: T): Promise<Q> =>
    instance
      .delete<Q>(`${ENV.API_ROOT}${url}`, { data: body })
      .then(({ data }) => data),
  patch: <T, Q>(url: string, body?: T): Promise<Q> =>
    instance.patch<Q>(`${ENV.API_ROOT}${url}`, body).then(({ data }) => data),
};

export const API = {
  jokesApi: {
    fetchJokes: () =>
      axios.get<{ jokes: string[] }>("https://v2.jokeapi.dev/joke/Any"),
  },
};
