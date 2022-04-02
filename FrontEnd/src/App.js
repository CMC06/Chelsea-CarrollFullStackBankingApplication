import { useState, useEffect, createContext } from 'react';
import './App.css';
import NavBar from './Components/NavBar';


export const UserContext = createContext();

function App() {
  
  const [users, setUsers] = useState();
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('email') ? true : false);
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('email') ? { email: sessionStorage.getItem('email'), name: sessionStorage.getItem('name'), balance: Number(sessionStorage.getItem('balance')) } : null);
  const [accountExists, setAccountExists] = useState(false);
  
  //pulling all account data from database
  useEffect(() => {
    const url = '/account/all';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setUsers([...data]);
      });
  }, [currentUser]);
  

  return (
    <div className="App">
    <UserContext.Provider value={currentUser} >
      <NavBar users={users} setUsers={setUsers} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} accountExists={accountExists} setAccountExists={setAccountExists} />
    </UserContext.Provider>
    </div>
  );
}

export default App;
