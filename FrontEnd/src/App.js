import { useState, useEffect, createContext } from 'react';
import './App.css';
import NavBar from './Components/NavBar';


export const UserContext = createContext();

function App() {
  //Previous mock user data: 
  //[{name: 'Peter Parker', email: 'spidey@web.web', password: 'abc123security', balance: 150000}, {name: 'Dorris Day', email: 'dorris@sunshine.com', password:'singingHappy!', balance: 1000}]
  const [users, setUsers] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: 'Peter Parker', email: 'spidey@web.web', password: 'abc123security', balance: 150000});
  
  useEffect(() => {
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        setUsers([...data]);
      });
  }, []);

  return (
    <div className="App">
    <UserContext.Provider value={currentUser} >
      <NavBar users={users} setUsers={setUsers} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </UserContext.Provider>
    </div>
  );
}

export default App;
