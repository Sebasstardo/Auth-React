import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'
import { auth } from '../firebase'



const Navbar = (props) => {


    const cerrarSesion = ()=>{
        //esta funcion nos permite cerrar sesion activa
        auth.signOut()
        .then(()=>{
            //cada vez que el usuario cierre sesion lo va a empujar al login
            props.history.push('/login')
        })
    }

    return (
        <div className="navbar navbar-dark bg-dark ">
            <Link className="navbar-brand ps-5 " to="/">
                AUTH
            </Link>
            <div className="d-flex pe-5">
                <NavLink className="btn btn-dark me-2" to="/" exact>
                    Inicio
                </NavLink>
                {
                    //si existe el usuario pinta el boton de admin
                    props.firebaseUser !== null ?(
                        <NavLink className="btn btn-dark me-2" to="/admin" exact>
                            Administracion
                        </NavLink>
                    ) : null

                }
                {
                    //si el usuario no exite (o es = a null) envia al login
                    props.firebaseUser !== null ? (
                        <button
                         className="btn btn-dark"
                         onClick={()=>cerrarSesion()}
                         >Cerrar Sesion</button>

                    ):(

                <NavLink className="btn btn-dark me-2" to="/login" exact>
                    Login
                </NavLink>
                    )
                }

            </div>
            
        </div>
    )
}

export default withRouter(Navbar )  
