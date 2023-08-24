const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = { ...state }
      newState.good += 1
      return newState
    case 'OK':
      const okState = { ...state }
      okState.ok += 1
      return okState
    case 'BAD':
      const badState = { ...state }
      badState.bad += 1
      return badState
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer
