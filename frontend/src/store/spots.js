import { csrfFetch } from './csrf';


const SET_ALL_SPOTS = "spots/getSpots";
// const DELETE_SPOT = "spots/deleteSpot";

const setAllSpots = (spots) => {
  return {
    type: SET_ALL_SPOTS,
    payload: spots
  };
};

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
    console.log('data', data.Spots)
    dispatch(setAllSpots(data.Spots))
    return response
}




////////////////////////////////////////////////////////
//REDUCER

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_SPOTS:{
      let newState = {...state};
      action.payload.forEach(spot => newState[spot.id] = spot)
      delete newState.spotsArray;
      newState.spotsArray = Object.values(action.payload)
      return newState
    }
    // case DELETE_SPOT:
    //   return { ...state, spots[id]: null };
    default:
      return state;
  }
};

export default spotsReducer;
