import userEvent from '@testing-library/user-event'
import React from 'react'
import {auth} from '../firebase'
import { withRouter } from 'react-router'
import Firestore from './Firestore'



const Admin = (props) => {
    //se pone en null para traer a todos los usuario ya registrados
    const [user, setUser] = React.useState(null)


    //auth.currentUser, nos trae toda la informacion del usuario
    React.useEffect(()=>{
        if(auth.currentUser){
            // console.log('exite un usuario')
            setUser(auth.currentUser)

        } else{
            // console.log('no existe el usuario')
            //redirige al usuario al login
            props.history.push('/login')
        }
    },[props.history])

    return (
        <div>
            <h1>Ruta Protegida</h1>
            {
                user && (
                    <Firestore user={user}></Firestore>
                )
            }
        </div>
    )
}

export default withRouter( Admin ) 
