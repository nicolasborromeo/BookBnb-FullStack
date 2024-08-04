import { IoClose } from "react-icons/io5";
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import './ConfirmDeleteModal.css'

function ConfirmDeleteModal({ spot, thing, action, actionIdentifier }) {
    const dispatch = useDispatch()
    const { setModalContent } = useModal()


    const yesDelete = (actionIdentifier) => {
        dispatch(action(actionIdentifier))
            .then(() => setModalContent(null))
    }
    return (
        <div className='confirm-delete-container'>
                <span className='confirm-delete-x' onClick={() => setModalContent(null)}><IoClose /></span>
            <div className='confirm-delete-text-container'>
                <h5 className='confirm-delete-heading'>Delete this {thing}?</h5>
                <h6 className='confirm-delete-subheading'>Your {thing === 'spot' ? `stay: "${spot.name}"` : thing} will be permanently deleted.</h6>
            </div>
            <div className='delete-modal-buttons-container'>
                <button className='confirm-delete-cancel-button' onClick={() => setModalContent(null)}>Cancel</button>
                <button className='confirm-delete-yes-button' onClick={() => { yesDelete(actionIdentifier) }}>Delete</button>
                {/* <button className='confirm-delete-no-button' onClick={() => setModalContent(null)}>No (Keep {upperCaser(thing)})</button> */}
            </div>
        </div>
    )
}


export default ConfirmDeleteModal
