import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

export default class StoreRegistration {

    constructor () {
        makeAutoObservable(this);
    }

    async registration(name: string, surname: string, login: string, password: string,) {
        try {
            const response = await AuthService.registration(name, surname, login, password);
            console.log(response);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
}