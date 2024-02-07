import { useContext} from "react"
import { Context } from "..";
import { Navigate } from "react-router-dom";
import UserService from "../services/UserService";

import { observer } from "mobx-react-lite";

function MainForm () {
    const {store} = useContext(Context)
    if (!store.isAuth) {
        return <Navigate to='/' />
    }

    async function getUser() {
        try {
            const response = await UserService.fetchUsers();
            console.log(response.data);
        } catch (e: any) {
            console.log(e);
        }
    }
    return (
        <div>
           <h1>{`Доброй пожаловать!` }</h1>
           <button onClick={() => { store.logout(); console.log(store.isAuth);}}>Выйти</button>
           <div>
                <button onClick = {getUser}>Получить пользователей</button>
           </div>
           <div>
            <h1>Список пользователей</h1>
            {
                
            }
         </div>
           
        </div>
    )
}

export default observer(MainForm);