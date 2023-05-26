import { Routes, Route } from 'react-router-dom';

import { Header } from "./components";
import { Home, Trainer, Rating, Registration, Login } from "./pages";

export default function App() {
  return (
    <div className='themeContainer wrapper'>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> }></Route>
        <Route path='/login' element={<Login /> }></Route>
        <Route path='/register' element={<Registration /> }></Route>
        <Route path='/trainer' element={<Trainer /> }></Route>
        <Route path='/rating' element={<Rating /> }></Route>
      </Routes>
    </div>
  );
}