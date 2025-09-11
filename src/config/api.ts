import type { IBackendRes, IAccount, IUser, IModelPaginate, IGetAccount, IPost } from '@/types/backend';
import axios from './axios-customize';

/**
 * 
Module Auth
 */
export const callRegister = (name: string, email: string, password: string) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/auth/register', { name, email, password })
}

export const callLogin = (username: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}

/**
 * 
Module Post
 */
export const callCreatePost = (title: string, content: string) => {
    return axios.post<IBackendRes<IPost>>('/api/v1/posts', { title, content })
}

export const callUpdatePost = (id: string, title: string, content: string) => {
    return axios.put<IBackendRes<IPost>>(`/api/v1/posts`, { id, title, content })
}

export const callDeletePost = (id: string) => {
    return axios.delete<IBackendRes<IPost>>(`/api/v1/posts/${id}`);
}

export const callFetchPost = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IPost>>>(`/api/v1/posts?${query}`);
}

export const callFetchUserPost = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IPost>>>(`/api/v1/user/posts?${query}`);
}

export const callFetchPostById = (id: string) => {
    return axios.get<IBackendRes<IPost>>(`/api/v1/posts/${id}`);
}

/**
 * 
Module User
 */
export const callCreateUser = (user: IUser) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/users', { ...user })
}

export const callUpdateUser = (user: IUser) => {
    return axios.put<IBackendRes<IUser>>(`/api/v1/users`, { ...user })
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
}

export const callFetchUser = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`/api/v1/users?${query}`);
}

