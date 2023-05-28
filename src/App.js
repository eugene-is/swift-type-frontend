import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from "./components";
import { Home, Trainer, Rating, Registration, Login, Account } from "./pages";
import { fetchAuthMe, isAuthSelect } from './redux/slices/auth'

export default function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelect)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
    // eslint-disable-next-line
  }, []);
  return (
    <div className='themeContainer wrapper'>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> }></Route>
        <Route path='/login' element={<Login /> }></Route>
        <Route path='/register' element={<Registration /> }></Route>
        <Route path='/trainer' element={<Trainer /> }></Route>
        <Route path='/rating' element={<Rating /> }></Route>
        <Route path='/account' element={<Account /> }></Route>
      </Routes>
    </div>
  );
}