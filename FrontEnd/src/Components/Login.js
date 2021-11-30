import { useState, useContext } from 'react';
import { UserContext } from '../App';

const Login = ({loggedIn, setLoggedIn}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);

  const user = useContext(UserContext);

  //TODO write submit logic to communicate with backend to check login credentials against stored credentials
  const handleSubmit = () => {
    console.log('You submitted your login credentials: ' + {email} + {password});
    const url = `/account/login/${email}/${password}`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    })();
  }

  const handleChange = (e) => {
    let validated = false; 

    if(e.target.id === 'email'){
      setEmail(e.target.value);
      if(e.target.value !== '' && password !== ''){
        validated = true;
      } else {
        validated = false;
      }
      if(e.target.value === ''){
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if(e.target.id === 'password') {
      setPassword(e.target.value);
      if(e.target.value !== '' && e.target.value.length >= 8 && password !== ''){
        validated = true;
      } else {
        validated = false;
      }
      if(e.target.value.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if(email === ''){
        setEmailError(true);
      }
    }
    
    if(e.target.value === ''){
      setBtnDisable(true);
    } 
    if(e.target.value !== '' && validated) {
      setBtnDisable(false);
    }

  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-body">
          {loggedIn ? 
          <p>Congratulations, you have successfully logged in to your account.</p>
          :
          <form onsubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Email:</label> <br />
            <input className="form-control" type="text" onChange={handleChange} id="email" placeholder="Account Holder Email"></input>
            {emailError ? <p className="negative smallP">You must enter a previously registered email address to login. If you do not yet have an account, go to "Create An Account" to sign up now.</p> : null }
            <label className="form-label">Password:</label> <br />
            <input type="password" minLength="8" placeholder="Password" id="password" onChange={handleChange} className="form-control" /> 
            {passwordError ? <p className="negative smallP">Your password must be at least 8 characters long.</p> : null } <br />
            {btnDisable ? <button type="button" disabled={true} onClick={handleSubmit} className="btn btn-dark">Login</button> : <button type="button" disabled={false} onClick={handleSubmit} className="btn btn-dark">Login</button>}
            </div>
          </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
