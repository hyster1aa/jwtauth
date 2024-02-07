import { useContext, useState } from "react"
import { ContextRegistration } from "..";
import { Link } from 'react-router-dom'



function RegFrom () {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {storeRegistration} = useContext(ContextRegistration)
    return (
        <div>
            <h1>Регистрация</h1>
            <div>
                <input 
                    onChange = {e => setName(e.target.value)}
                    value = {name}
                    type = "text"
                    placeholder = "Введите Имя"
                />
                <input
                    onChange = {e => setSurname(e.target.value)}
                    value = {surname}
                    type = "text"
                    placeholder = "Введите Фамилию"
                />
                <input 
                    onChange = {e => setLogin(e.target.value)}
                    value = {login}
                    type = "text"
                    placeholder = "Введите Логин"
                />
                <input 
                    onChange = {e => setPassword(e.target.value)}
                    value = {password}
                    type = "text"
                    placeholder = "Введите Пароль"
                />
                <button onClick={() => {storeRegistration.registration(name, surname, login, password);}}>
                    Регистрация
                </button>
            </div>
            <Link to='/'>Уже есть аккаунт? Войдите!</Link>
        </div>
    )
}

export default RegFrom;