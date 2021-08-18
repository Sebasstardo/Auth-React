import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import React from 'react'

import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';

import {auth} from './firebase'


function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  //En esta funcion se existe un usuario registrador lo va a traer
  React.useEffect(()=>{
    auth.onAuthStateChanged(user =>{
      console.log(user)

      if(user){
        setFirebaseUser(user)
      } else{
        //sera null
        setFirebaseUser(null)
      }
    })
  },[])

//si esto esta en falso va a pintar cargando
  return firebaseUser !== false ? (
    <Router>
     <Navbar firebaseUser = {firebaseUser}></Navbar>

    <div className="container">
     <Switch>

       <Route path = '/login'>
         <Login></Login>
       </Route>

       <Route path = '/admin'>
         <Admin></Admin>
       </Route>
       <Route path = '/'>
         Inicio..

       </Route>
     </Switch>
    </div>
    </Router>
  ) :(
    <p>Cargando</p>
  )
}

export default App;
