import React from 'react';
import { Link } from 'react-router-dom';
import { GiKeyboard } from 'react-icons/gi';

import { Btn } from '../';
import styles from './Header.module.scss';

/**
 * Компонент шапки приложения.
 * 
 * @returns {JSX.Element} - Отображаемый компонент заголовка.
 */
export const Header = () => {
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
                        <Btn text="Sign In" className="two" link="/login" />
                      </li>
                      <li>
                        <Btn text="Sign Up" className="one" link="/register" />
                      </li>
                    </ul>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};