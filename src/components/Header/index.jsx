import React from 'react';
import { Link } from 'react-router-dom';
import { GiKeyboard } from 'react-icons/gi';
import { BiMoon, BiSun } from 'react-icons/bi';

import { Btn } from '../';
import { useTheme } from '../../hooks/use-theme';
import styles from './Header.module.scss';

/**
 * Компонент шапки приложения.
 * 
 * @returns {JSX.Element} - Отображаемый компонент заголовка.
 */

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const ThemeIcon = theme === 'light' ? BiMoon : BiSun;

  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <header className={styles.header}>
      <div className={`${styles.container}`}>
        <div className={styles.header__content}>
          <nav className={styles.nav}>
            <div className={`${styles.nav__logo}`}>
              <Link className={styles.link} to="/">
                <GiKeyboard className={`${styles.logo} ${styles.themeLogo}`} />
                <div className={styles.themeText}>SwiftType</div>
              </Link>
            </div>
            <ul className={styles.nav__list}>
              <li>
                <Link to="/trainer">
                  <span className={styles.themeText}>Trainer</span>
                </Link>
              </li>
              <li>
                <Link to="/rating">
                  <span className={styles.themeText}>Rating</span>
                </Link>
              </li>
              <li>
                {isAuth ? (
                  <>
                    <Btn onclick={onClickLogout} text="Logout" />
                  </>
                ) : (
                  <>
                    <ul className={`${styles.nav__list} ${styles.themeText}`}>
                      <li>
                        <div className={ styles.btnShow }>
                          <Btn text="Sign In" className="two" link="/login" />
                          <div className={ styles.btnHidden }>
                            <Btn text="Sign Up" className="one" link="/register" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </>
                )}
              </li>
              <li>
                <div className='themeIcon' onClick={handleThemeToggle}>
                  <ThemeIcon className='themeLogo' size='2em'/>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};