import { csrfFetch } from './csrf';


const SET_ALL_SPOTS = "spots/getSpots";
const SET_USER_SPOTS = "spots/setUserSpots";
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

export const postNewSpot = (spot, images) => async () => {
  // Create Spot POST /api/spots
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  const spotId = data.id;

  // Create spotImages POST /api/spots/:spotId/images
  for (const img in images) {
    let preview = img == 1 ? true : false;
    const body = {
      url: images[img],
      preview: preview,
    };
    // const imageResponse =
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    // const imgData = await imageResponse.json();
  }

  return data;
};


export const fetchUserSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current')
  const data = await response.json()
  dispatch(setUserSpots(data))
  return response
}

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
    // case DELETE_SPOT:
    //   return { ...state, spots[id]: null };
    default:
      return state;
  }
};

export default spotsReducer;
