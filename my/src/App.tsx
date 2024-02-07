//mobx - управление состоянием

import { useContext, useEffect } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import LoginFrom from './compomemts/LoginFrom';
import RegFrom from './compomemts/RegistrationForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import MainForm from './compomemts/MainForm';

function App() {
  const { store } = useContext(Context)
  useEffect(() => { 
    if(localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div>
      <Routes>
        <Route path='/' element ={<LoginFrom />} />
        <Route path='/registration' element={<RegFrom/>} /> 
        <Route path='/main' element={<MainForm/>} />
        <Route path='*' element={<LoginFrom/>} />
      </Routes>
    </div>
  );
}

export default observer(App);
