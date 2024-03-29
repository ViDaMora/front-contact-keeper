import React, {useReducer} from 'react'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'
import {v4 as uuid} from 'uuid'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => { 
    const initialState =[]
    



    const [state,dispatch] = useReducer(AlertReducer,initialState)
    
    //Set Alert
    const setAlert =(msg,type)=> {
        const id = uuid()
        dispatch({type:SET_ALERT,payload:{msg,type,id}})
        setTimeout(()=> dispatch({type:REMOVE_ALERT,payload:id}),5000)
       
    }
   
    return (
        <AlertContext.Provider value={{
            alerts:state,
            setAlert
            }
        } 
        
        {...props}>
        </AlertContext.Provider>
    )
}

export default AlertState