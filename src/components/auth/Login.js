import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import AlertContext from '../../context/alert/AlertContext'

 const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {login, error,clearErrors, isAuthenticated}=authContext
    const {setAlert}=alertContext


    useEffect(() =>{
        if(isAuthenticated){
            props.history.push('/')
        }
    
        if(error === 'Invalid credentials'){
            setAlert(error,'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    },[error,isAuthenticated,props.history])

     const [user,setUser]= useState({
         email:'',
         password:'',
     })
     const {email,password}=user

     const onChange = e =>{
        setUser({
            ...user, [e.target.name]:e.target.value
        })
     }

     const onSubmit= e =>{
        e.preventDefault()
        if (email==='' || password==='') {
            setAlert('Please enter all fields','danger')
        }else{
            login({
                email,password
            })
        }
        
     }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" required value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>

        </div>
    )
}
export default Login
