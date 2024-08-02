import { useDispatch } from 'react-redux'
import {useModal} from '../../context/Modal'
import * as spotSession from '../../store/spots'

function DeleteSpotModal({spotId}) {
    const dispatch = useDispatch()
    const {setModalContent} = useModal()

    const deleteSpot = (spotId) => {
        dispatch(spotSession.deleteSpot(spotId))
        .then(()=> {
            setModalContent(null)
        })
    }

    return (
        <>
            <h5>Confirm Delete:</h5>
            <h6>Are you sure you want to remove this spot?</h6>
            <button style={{backgroundColor:'red'}} onClick={()=>{deleteSpot(spotId)}}>Yes (Delete Spot)</button>
            <button style={{backgroundColor:'gray'}} onClick={()=> setModalContent(null)}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModal
