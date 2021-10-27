import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./components/login/Login";
import { LogoutButton } from "./components/login/logout";
import { Profile } from "./Profile";
import Rutas from './components/Rutas';
import MenuPrincipal from './components/MenuPrincipal';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <MenuPrincipal />
      <Rutas />
    </BrowserRouter>
  );
}

export default App;







/* import './App.css'; */
/* import Rutas from './components/Rutas'; */
/* import MenuPrincipal from './components/MenuPrincipal'; */
/* import {BrowserRouter} from 'react-router-dom'; */
/*  */
/* function App() { */
/*   return ( */
/*     <BrowserRouter> */
/*     <MenuPrincipal /> */
/*     <Rutas /> */
/*     </BrowserRouter> */
/*   ); */
/* } */
/*  */
/* export default App; */
/*  */