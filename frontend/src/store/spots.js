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

// export const fetchSpots = () => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch("/api/session", {
//     method: "POST",
//     body: JSON.stringify({
//       credential,
//       password
//     })
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots")
    const data = await response.json()
    console.log('data', data.Spots)
    dispatch(setAllSpots(data.Spots))
    return response
}


// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch('api/session', {
//     method: 'DELETE'
//   })
//   const data = await response.json()
//   console.log(data)
//   dispatch(removeUser())
//   return response
// }


////////////////////////////////////////////////////////
//REDUCER

const initialState = [];

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_SPOTS:
      return { ...state, allSpots: action.payload };
    // case DELETE_SPOT:
    //   return { ...state, spots[id]: null };
    default:
      return state;
  }
};

export default spotsReducer;
