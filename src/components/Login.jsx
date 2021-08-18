
import React, {Fragment, useState} from 'react' 
import {auth,db} from '../firebase'
//permite al empujar al usuario a diferentes rutas tambien hay que cambiar el LOGIN de abajo
import { withRouter } from 'react-router'

const Login = (props) => {

    const [email, setEmail] = useState('prueba@prueba.cl')
    const [pass, setPass] = useState('111111')

    //debe estar en null, para mostrarlo en el sitio
    const [error, setError] = useState(null)

    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = e =>{
        e.preventDefault()

        if(!email.trim()){
            // console.log('Ingrese Email')
            setError('Ingrese Email')
        return

        }

        if(!pass.trim()){
            // console.log('Ingrese pass')
            setError('Ingrese Password')
        return

        }
        if(pass.length<6){
            // console.log('')
            setError('La password debe ser mayor a 6')
        return

        }
        setError(null)
        // console.log('pasando las validacion')
        if(esRegistro){
            registrar()
        }else{
            login()
        }

    }

    //Crear Login de usuario creado
    const login = React.useCallback(async()=>{
        try {
         const res = await auth.signInWithEmailAndPassword(email,pass)
        //  console.log(res.user)
         setEmail('')
         setPass('')
         setError(null)
         //aqui seleccionamos la ruta donde va a empujar el withRouter
         props.history.push('/admin')
        } catch (error) {
            console.log(error)
            if(error.code ==='auth/invalid-email'){
                
                setError('Email No Valido')
            }
            if(error.code ==='auth/user-not-found'){
                
                setError('Email No Registrado')
            }
            if(error.code ==='auth/wrong-password'){
                
                setError('Contraseña Incorrecta')
            }
            
        }
    },[email,pass, props.history])

    //  CREAR USUARIO
    const registrar = React.useCallback(async()=>{
        
        try {
            //CREAR UN NUEVO USUARIO
           const res = await auth.createUserWithEmailAndPassword(email, pass)
        //    console.log(res.user)

        //NUEVA COLECCION DE LA BASE DE DATOS
        await db.collection('usuarios').doc(res.user.email).set({
            email: res.user.email,
            uid:res.user.uid
        })
        await db.collection(res.user.uid).add({
            name:'Tarea de Ejemplo',
            fecha: Date.now()
        })
        setEmail('')
        setPass('')
        setError(null)

        props.history.push('/admin')


        } catch (error) {
            if(error.code ==='auth/invalid-email'){
                
                setError('Email No Valido')
            }
            if(error.code ==='auth/email-already-in-use' ){
                setError('Usuario Registrado')
                console.log(error)
            }
        }

    },[email,pass,props.history])


    return (
        <div className="mt-4">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de Usuarios': 'Login de Acceso'
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6-col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            //se ocupa para evitar poner el null en un operador ternario
                            // SI este contenedor TIENE algo, no es null agrega el div
                            //asi se evita poner el condicional ternario con 2 valores
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                        type="email" 
                        className="form-control mb-2" 
                        placeholder="Ingrese un Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}/>
                        
                          <input 
                        type="password" 
                        className="form-control  mb-2" 
                        placeholder="Ingrese un Password"
                        onChange={e => setPass(e.target.value)}
                        value={pass}/>

                        <button className="btn btn-dark btn-lg w-100 mb-2" type="submit">
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>

                        <button 
                        className="btn btn-info btn-sm w-100"
                        onClick={()=> setEsRegistro(!esRegistro)}
                        type ="button"
                        >
                            {
                                esRegistro ? '¿Ya Tienes Cuenta?' : '¿No tienes cuenta?'
                            }
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login) 
