import { csrfFetch } from './csrf';


const SET_ALL_SPOTS = "spots/getSpots";
const SET_USER_SPOTS = "spots/setUserSpots";
const SET_CURRENT_SPOT = "spots/setCurrentSpot"
const SET_UPDATED_SPOT = "spots/setUpdatedSpot"
// const DELETE_SPOT = "spots/deleteSpot";

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

// const addSpotToState = (spot) => {
//   return {
//     type: CREATE_SPOT,
//     payload: spot
//   }
// }
// const deleteSpot = () => {
//   return {
//     type: DELETE_SPOT
//   };
// };

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
  console.log('spot inside action', spot)
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spot)
  })
  const data = await response.json()
  dispatch(setUpdatedSpot(data))
  return data
}

// export const updateSpotImages = (spot) => async (dispatch) => {
//   const response = await csrfFetch(``)
// }


// export const postNewSpot = (spot, images) => async () => {
//   // Create Spot POST /api/spots
//   const response = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(spot),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   const data = await response.json();
//   const spotId = data.id;

//   // Create spotImages POST /api/spots/:spotId/images
//   for (const img in images) {
//     let preview = img == 1 ? true : false;
//     const body = {
//       url: images[img],
//       preview: preview,
//     };
//     // const imageResponse =
//     await csrfFetch(`/api/spots/${spotId}/images`, {
//       method: 'POST',
//       body: JSON.stringify(body),
//     });
//     // const imgData = await imageResponse.json();
//   }

//   return data;
// };




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
      let newState = {...state, currentSpot}
      return newState
    }
    case SET_UPDATED_SPOT: {
      let updatedSpot = {...action.payload} //get spot
      let newState = {...state} // copy state
      newState.userSpots[updatedSpot.id] = updatedSpot //update spot in state
      delete newState.currentSpot //delete  current spot
      delete newState.userSpotsArray // delete it from the state
      newState.userSpotsArray = Object.values(newState.userSpots)
      return newState
    }
    // case DELETE_SPOT:
    //   return { ...state, spots[id]: null };
    default:
      return state;
  }
};

export default spotsReducer;
