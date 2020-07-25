import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import GeneralContext from '../../contexts/GeneralContext';
import AuthApiService from '../../services/auth-api-service';

const LoginForm = (props) => {

  const GenCon = useContext(GeneralContext);

  const [state, setState] = useState({error: null});

  const handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    setState(oldVals => ({...oldVals, error: null}));
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
    .then(res => {
      user_name.value = ''
      password.value = ''
      TokenService.saveAuthToken(res.authToken)
      GenCon.getUserState()
      props.onLoginSuccess()
    })
    .catch(res => {
      setState(oldVals => ({...oldVals, error: res.error}));
    })
  };

  return (
    <form className="signup-form"
    onSubmit={handleSubmitJwtAuth}
    >
      <div role='alert'>{state.error && <p className='red'>{state.error}</p>}</div>
      <div>
        <label htmlFor="user_name">Username</label>
        <input placeholder="Username" autoComplete="username" type="text" name="user_name" id="user_name" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" autoComplete="current-password" name="password" id="password" />
      </div>
      <button type="submit">Log In <i className="fas fa-sign-in-alt"></i></button>
      <p>Not A Member? </p>
      <Link to='/register'>Register Here:</Link>
    </form>
  );
}

export default LoginForm;