import React from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router'


const Reset = (props) => {

    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState(null)

    const procesarDatos = e =>{
        e.preventDefault()

        if(!email.trim()){
            // console.log('Ingrese Email')
            setError('Ingrese Email')
        return

        }

        setError(null)

        recuperar()


    }

    const recuperar = React.useCallback(async()=>{
        try {

            await auth.sendPasswordResetEmail(email)
            // console.log('correo enviado')
            props.history.push ('login')
            
        } catch (error) {
            setError(error.message)
        }
    }, [email, props.history])



    return (
        <div className="mt-4">
        <h3 className="text-center">
            Reiniciar Contraseña
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
                    
          

                    <button className="btn btn-dark btn-lg w-100 mb-2" type="submit">
                        Reiniciar Contraseña
                    </button>         

                </form>
            </div>
        </div>
    </div>
    )
}

export default  withRouter(Reset ) 
