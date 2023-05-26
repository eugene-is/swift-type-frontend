import { Routes, Route } from 'react-router-dom';
import { BiMoon, BiSun } from 'react-icons/bi';

import { Header } from "./components";
import { Home, Trainer, Rating, Registration, Login } from "./pages";
import { useTheme } from './hooks/use-theme.jsx';

export default function App() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const ThemeIcon = theme === 'light' ? BiMoon : BiSun;

  return (
    <div className='themeContainer wrapper'>
      <Header />
      <div className='themeIcon' onClick={handleThemeToggle}>
        <ThemeIcon className='themeLogo' size='2em'/>
      </div>
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