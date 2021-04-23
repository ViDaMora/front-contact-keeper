import React,{useContext} from 'react'
import ContactContext from '../../context/contact/ContactContext'
import PropTypes from 'prop-types'

 const ContactItem = ({contact}) => {
    const {name, _id, email, phone, type}= contact
    const contactContext = useContext(ContactContext);
    const {deleteContact,setCurrent, clearCurrent} = contactContext

     const onDelete =()=>{
        deleteContact(_id)
        clearCurrent()
     }

     const onUpdate =()=>{
         setCurrent(contact)
     }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left"> {name}{' '}
             <span className={'badge ' + (type==='profesional'? 'badge-success': 'badge-primary')} style={{float: 'right'}}>
                 {type.charAt(0).toUpperCase() + type.slice(1)}
             </span>

            </h3>
            <ul className="list">
                {email && (<li>
                    <i className="fas fa-envelope-open"></i> {email}
                    </li>)}

                    {phone && (<li>
                    <i className="fas fa-phone"></i> {phone}
                    </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onUpdate}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>

            </p>
        </div>
    )
}
ContactItem.protoType={
    contact: PropTypes.object.isRequired,

}

export default ContactItem