import React, { Fragment, useState } from 'react';

import styles from './Login.module.scss';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regUsuario, setRegUsuario] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const onTogglePass = () => setIsPassVisible(!isPassVisible);

  const onToggleView = () => setIsLogin(!isLogin);

  const regEmailChange = event => {
    setRegEmail(event.target.value);
  };

  const regUsuarioChange = event => {
    setRegUsuario(event.target.value);
  };

  const regPasswordChange = event => {
    setRegPassword(event.target.value);
  };

  const loginUsuarioChange = event => {
    setLoginUsuario(event.target.value);
  };

  const loginPasswordChange = event => {
    setLoginPassword(event.target.value);
  };

  const registrarse = () => {
    fetch(`http://localhost:3000/login/register?user=${regUsuario}&email=${regEmail}&pass=${regPassword}`)
      .then(async response => {
        const data = await response.json();
        console.log(data);
      })
      .catch(error => {
        alert(error);
      });
  };
  const iniciarSesion = () => {
    fetch(`http://localhost:3000/login/entry?user=${regUsuario}&&pass=${regPassword}`)
      .then(async response => {
        const data = await response.json();
        console.log(data);
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <Fragment>
      <div className={styles.logForm}>
        <div className={`${styles.signup} ${!isLogin ? styles.slideUp : ''}`}>
          <h2 className={styles.formTitle} onClick={() => onToggleView()}>
            <span>or</span>Registrate
          </h2>
          <div className={styles.formHolder}>
            <div className={styles.inputWrap}>
              <input
                type="text"
                className={styles.input}
                placeholder="Usuario"
                id="regUsuario"
                name="regUsuario"
                onChange={regUsuarioChange}
                value={regUsuario}
              />
            </div>
            <div className={styles.inputWrap}>
              <input
                id="logInPass"
                type="email"
                className={styles.input}
                placeholder="Email"
                name="regEmail"
                onChange={regEmailChange}
                value={regEmail}
              />
            </div>
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                id="pass"
                placeholder="Contraseña"
                type="password"
                name="regPassword"
                onChange={regPasswordChange}
                value={regPassword}
              />
              <i id="eye" className="fa fa-eye showPass"></i>
            </div>
          </div>
          <button onClick={registrarse} className={styles.submitButton}>
            Registrate
          </button>
        </div>
        <div className={`${styles.login} ${isLogin ? styles.slideUp : ''}`}>
          <div className={styles.center}>
            <h2 className={styles.formTitle} onClick={() => onToggleView()}>
              <span>o</span>Inicia sesión
            </h2>
            <div className={styles.formHolder}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                name="loginUsuario"
                onChange={loginUsuarioChange}
                value={loginUsuario}
              />
              <input
                className={styles.input}
                id="pwd"
                placeholder="Contraseña"
                name="loginPassword"
                onChange={loginPasswordChange}
                value={loginPassword}
                type={isPassVisible ? 'text' : 'password'}
              />
            </div>
            <button onClick={iniciarSesion} className={styles.submitButton}>
              Inicia sesión
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
