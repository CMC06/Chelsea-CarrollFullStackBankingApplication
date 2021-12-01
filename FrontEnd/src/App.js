import { useState, useEffect, createContext } from 'react';
import './App.css';
import NavBar from './Components/NavBar';


export const UserContext = createContext();

function App() {
  //Previous mock user data: 
  //[{name: 'Peter Parker', email: 'spidey@web.web', password: 'abc123security', balance: 150000}, {name: 'Dorris Day', email: 'dorris@sunshine.com', password:'singingHappy!', balance: 1000}]
  const [users, setUsers] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
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
      <NavBar users={users} setUsers={setUsers} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} />
    </UserContext.Provider>
    </div>
  );
}

export default App;
