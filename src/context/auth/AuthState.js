import React, {useReducer} from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import Axios from  'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

import setAuthToken from '../../utils/setAuthToken'

const AuthState = props => { 
    const initialState ={
        token: localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState)
    
    //Load user
    const loadUser =async ()=>{
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res= await Axios.get('/api/auth')
            dispatch({type:USER_LOADED, payload: res.data})
        } catch (err) {
            dispatch({type:AUTH_ERROR})
        }
    }

    //Register Users
    const register = async formData=>{
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await Axios.post('/api/users', formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload:res.data
            })

            loadUser()
        }catch(err){
                dispatch({
                    type: REGISTER_FAIL,
                    payload:err.response.data.msg
                })
        }
    }
    //Login User
    const login =async formData=>{
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await Axios.post('/api/auth', formData, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload:res.data
            })

            loadUser()
        }catch(err){
                dispatch({
                    type: LOGIN_FAIL,
                    payload:err.response.data.msg
                })
        }
    }
    //Logout
    const logOut =()=>{
        dispatch({type: LOGOUT})
    }
    //Clear Errors
    const clearErrors =()=>{
        dispatch({type: CLEAR_ERRORS})
    }
   

    return (
        <AuthContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            register,
            login,
            logOut,
            clearErrors,
            loadUser
           
            }
        } 
        
        {...props}>
        </AuthContext.Provider>
    )
}

export default AuthState