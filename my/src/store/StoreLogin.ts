import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from 'axios'
import { AuthResponse } from "../models/Response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    
    constructor () {
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setLoading(bool: boolean) {
        this.isLoading=bool;
    }

    async login(login: string, password: string) {
        try {
            const response = await AuthService.login(login, password);

            console.log("u here");
            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);

            this.setUser(response.data.uDto);
            this.setAuth(true);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);
            console.log(localStorage.getItem('token'));
            this.setUser(response.data.uDto);
            this.setAuth(true);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        try{
            await AuthService.logout();
            localStorage.removeItem('token');
            console.log(localStorage.getItem('token'));
            this.setUser({} as IUser);
            this.setAuth(false);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        
    }
}