import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AllData from "./AllData";
import Balance from "./Balance";
import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Withdraw from "./Withdraw";

const NavBar = ({ users, loggedIn, setLoggedIn, setCurrentUser, currentUser }) => {

  return (
    <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" title="Bad Bank Home Page">Bad Bank</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              { (currentUser === null) ? 
                <>
                  <li className="nav-item">
                    <Link to="/create-account" className="nav-link" title="Click here to sign up for a new account.">Create Account</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" title="If you have an existing account, click here to login.">Login</Link>
                  </li>
                </>
              :
                <>
                  <li className="nav-item">
                    <Link to="/deposit" className="nav-link" title="Make a deposit to your account.">Deposit</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/withdraw" className="nav-link" title="Make a withdrawal from your account.">Withdraw</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/balance" className="nav-link" title="Check your balance information.">Balance</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/all-data" className="nav-link" title="View all user data.">All Data</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link" title="Logout.">Logout</Link>
                  </li>
                </>
              }
            </ul>
            { (currentUser !== null) ? 
              <div className="navbar-text-box">
                <span class="navbar-text">Welcome, {currentUser.name}!</span>
              </div>
            : <></>}
          </div>    
        </div>
      </nav>

        {/* switch statement checks for correct routing path */}
        <Switch>
          <Route path="/create-account">
            <CreateAccount loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/login">
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/deposit">
            <Deposit />
          </Route>
          <Route path="/withdraw" >
            <Withdraw />
          </Route>
          <Route path="/balance">
            <Balance />
          </Route>
          <Route path="/all-data">
            <AllData users={users} />
          </Route>
          <Route path="/logout">
            <Logout setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default NavBar
