import React, {useState, useContext,useEffect}from 'react'
import ContactContext from '../../context/contact/ContactContext'

 const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const {addContact,current,clearCurrent,updateContact}=contactContext

     const [contact, setContact]= useState({
         name:'',
         email:'',
         phone:'',
         type:'personal'
     })

     useEffect(()=>{
         if(current!=null){
             setContact(current)
         }else{
            setContact({
            
                name:'',
                email:'',
                phone:'',
                type:'personal'
        })
         }
     },[current,contactContext])


     const {name,email,phone, type} = contact

     const onChange = e => setContact({
        ...contact, [e.target.name]:e.target.value
    })

    const clearAll = () =>{

        clearCurrent()
    }


    const onSubmit = e =>{
        e.preventDefault()
        if(current===null){
            addContact(contact);
        }else{
            updateContact(contact) 
        }
        clearAll()
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current? 'Update Contact': 'Add Contact'}</h2>
            <input type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}/>

            <input type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}/>

            <input type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={onChange}/>

            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type==='personal'} onChange={onChange}/>{' '}Personal{' '}
            <input type="radio" name="type" value="profesional" checked={type==='profesional'} onChange={onChange}/>{' '}Profesional
            <div>
                <input type="submit" value={current? 'Update Contact': 'Add Contact'} className="btn btn-primary btn-block"/>
            </div>
            {current && <div>
                <button className="btn btn-ight btn-block" onClick={clearAll}>Clear</button>
                </div>}
        </form>
    )
}


export default ContactForm