import { useDispatch } from 'react-redux'
import {useModal} from '../../context/Modal'
import * as spotSession from '../../store/spots'

function DeleteReviewModal({reviewId}) {
    const dispatch = useDispatch()
    const {setModalContent} = useModal()

    const deleteReview = (reviewId) => {
        dispatch(spotSession.deleteReview(reviewId))
        .then(()=> {
            setModalContent(null)
        })
    }

    return (
        <>
            <h5>Confirm Delete:</h5>
            <h6>Are you sure you want to remove this review?</h6>
            <button style={{backgroundColor:'red'}} onClick={()=>{deleteReview(reviewId)}}>Yes (Delete Review)</button>
            <button style={{backgroundColor:'gray'}} onClick={()=> setModalContent(null)}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReviewModal
