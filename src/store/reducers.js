

const SET_SINGER = 'SET_SINGER'


export function singer(state = {}, action) {
  switch (action.type) {
    case SET_SINGER:
      return action.payload
    default:
      return state
  }
}

export function setSinger(singer) {
  return { type: SET_SINGER, payload: singer }
}
