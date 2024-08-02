import { csrfFetch } from './csrf';


const SET_ALL_SPOTS = "spots/getSpots";
const SET_USER_SPOTS = "spots/setUserSpots";
const SET_CURRENT_SPOT = "spots/setCurrentSpot"
const SET_UPDATED_SPOT = "spots/setUpdatedSpot"
const REMOVE_SPOT_FROM_STATE = "spots/removeSpotFromState";
const REMOVE_REVIEW_FROM_STATE = "spots/removeReviewFromState";



const setAllSpots = (spots) => {
  return {
    type: SET_ALL_SPOTS,
    payload: spots
  };
};

const setUserSpots = (spots) => {
  return {
    type: SET_USER_SPOTS,
    payload: spots
  }
}

const setCurrentSpot = (spot) => {
  return {
    type: SET_CURRENT_SPOT,
    payload: spot
  }
}

const setUpdatedSpot = (spot) => {
  return {
    type: SET_UPDATED_SPOT,
    payload: spot
  }
}

const removeSpotFromState = (spotId) => {
  return {
    type: REMOVE_SPOT_FROM_STATE,
    payload: spotId
  };
};

const removeReviewFromState = (reviewId) => {
  return {
    type: REMOVE_REVIEW_FROM_STATE,
    payload: reviewId
  };
};


////////////////////////////////////////////////////////
//ACTIONS


export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots")
  const data = await response.json()
  dispatch(setAllSpots(data.Spots))
  return response
}

export const fetchUserSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current')
  const data = await response.json()
  dispatch(setUserSpots(data))
  return response
}

export const fetchCurrentSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  const data = await response.json()
  dispatch(setCurrentSpot(data))
  return data
}

export const updateSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spot)
  })
  const data = await response.json()
  dispatch(setUpdatedSpot(data))
  return data
}

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })
  const data = await response.json()
  if(response.ok) {
    dispatch(removeSpotFromState(spotId))
  }
  return data
}

export const postReview = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review)
  })
  if(!response.ok) {
    const error = response.json()
    return error
  }
  const newReview = await response.json()

  if(response.ok) {
    const spotResponse = await csrfFetch(`/api/spots/${spotId}`)
    const updatedSpot= await spotResponse.json()
    dispatch(setCurrentSpot(updatedSpot))
  }
  return newReview
}

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  dispatch(removeReviewFromState(reviewId))
  return data

}
// export const updateSpotImages = (spot) => async (dispatch) => {
//   const response = await csrfFetch(``)
// }



////////////////////////////////////////////////////////
//REDUCER

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_SPOTS: {
      let newState = { ...state };
      action.payload.forEach(spot => newState[spot.id] = spot)
      delete newState.spotsArray;
      newState.spotsArray = Object.values(action.payload)
      return newState
    }
    case SET_USER_SPOTS: {
      let userSpots = {}
      action.payload.Spots.forEach(spot => userSpots[spot.id] = spot)
      let newState = { ...state, userSpots }
      delete newState.userSpotsArray
      newState.userSpotsArray = Object.values(action.payload.Spots)
      return newState
    }
    case SET_CURRENT_SPOT: {
      let currentSpot = {...action.payload}
      let spotReviews = {}
      action.payload.Reviews.forEach(review => {
        spotReviews[review.id] = review
      })
      let spotReviewsArray = Object.values(spotReviews)
      let newState = {...state, currentSpot, spotReviews, spotReviewsArray}
      return newState
    }
    case SET_UPDATED_SPOT: {
      let updatedSpot = {...action.payload} //get spot
      let newState = {...state} // copy state
      newState.userSpots[updatedSpot.id] = updatedSpot //update spot in state
      delete newState.currentSpot //delete  current spot
      delete newState.userSpotsArray // delete it from the state
      newState.userSpotsArray = Object.values(newState.userSpots) //crea a new array
      return newState
    }
    case REMOVE_SPOT_FROM_STATE: {
      let newState = {...state}
      delete newState.userSpots[action.payload]
      delete newState.userSpotsArray // delete it from the state
      newState.userSpotsArray = Object.values(newState.userSpots) //crea a new array
      return newState
    }

    case REMOVE_REVIEW_FROM_STATE: {
      let reviewId = action.payload
      let newState= {...state}
      delete newState.spotReviewsArray
      delete newState.spotReviews[reviewId]
      let spotReviewsArray = Object.values(newState.spotReviews)
      return {...newState, spotReviewsArray}
    }
    // case ADD_REVIEW_TO_SPOT: {
    //   let newState = {...state}
    //   let newReview = action.payload
    //   newState.currentSpot.Reviews.push(action.payload)
    //   return newState
    // }
    default:
      return state;
  }
};

export default spotsReducer;
