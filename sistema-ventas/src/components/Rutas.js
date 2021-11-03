import { Switch, Route } from "react-router-dom";
import Inicio from '../views/Inicio';
import Ventas from "../views/Ventas";
import HomePage from "../views/Home";
import Usuarios from "../views/Usuarios";
import Productos from '../views/Productos';

const Rutas = () => {
    return(
        <Switch>
            <Route exact path='/' component={Inicio}/>
            <Route exact path='/Home' component={HomePage} />
            <Route exact path='/Ventas' component={Ventas} />
            <Route exact path='/Usuarios' component={Usuarios} />
            <Route exact path='/Productos' component={Productos} />
        </Switch>
    )
}

export default Rutas;