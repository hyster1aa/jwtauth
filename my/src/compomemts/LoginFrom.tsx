import { useContext, useState, FC } from "react"
import { Context } from "..";
import { Navigate, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";



const LoginFrom: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context)

    if (store.isAuth) {
        return <Navigate to='/main' />
    }
    return (
        <div>
            <h1>Авторизация</h1>
            <div>
                <input 
                    onChange = { e => setLogin(e.target.value) }
                    value = {login}
                    type = "text"
                    placeholder = "Введите Логин"
                />
                <input
                    onChange = { e=> setPassword(e.target.value) }
                    value = {password}
                    type = "text"
                    placeholder = "Введите Пароль"
                />
                <button onClick={() => store.login(login, password) }>
                    Логин
                </button>
            </div>
            <Link to='/registration'>Еще нет аккаунта? Создайте его!</Link>
        </div>
    )
}

export default observer(LoginFrom);