import { AxiosResponse } from "axios";
import $api from "../http"
import { AuthResponse } from "../models/Response/AuthResponse";
import { RegistrationResponse } from "../models/Response/RegResponse";

export default class AuthService {
    static async login(u_login: string, u_password: string): Promise <AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {u_login, u_password});
    }

    static async registration(u_name: string, u_surname: string, u_login: string, u_password: string) : Promise<AxiosResponse<RegistrationResponse>> {
        return $api.post<RegistrationResponse>('/registration', {u_name, u_surname, u_login, u_password});
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}