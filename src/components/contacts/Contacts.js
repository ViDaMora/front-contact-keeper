import React,{Fragment,useContext,useEffect} from 'react'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/ContactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contact = () => {
    const contactContext = useContext(ContactContext)
    const {contacts, filtered, getContacts,loading} = contactContext
    useEffect(() =>{
        getContacts()
        // eslint-disable-next-line
    },[])

    if (contacts.length===0 && contacts !==null && !loading) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {contacts!=null && !loading? (<TransitionGroup>
            {(filtered === null)?
            contacts.map(contact=>(
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem key={contact._id} contact={contact}/>
                </CSSTransition>
            )):filtered.map(filtered=>(
                <CSSTransition key={filtered._id} timeout={500} classNames="item">
                <ContactItem key={filtered._id} contact={filtered}/>
                </CSSTransition>

            ))}
            </TransitionGroup>): <Spinner/>}
            
        </Fragment>
    )
}

export default Contact