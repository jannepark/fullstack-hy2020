import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const  anecdoteSlicer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    IncrementVote(state, action) {
      const id = action.payload.id
        const anecdoteToVote = {...state.find(n => n.id === id)}
        anecdoteToVote.votes += 1
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : anecdoteToVote
          )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { IncrementVote, appendAnecdote,setAnecdote} = anecdoteSlicer.actions 

export const initializeAnecedotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdote(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteAnecdote = id => {
  return async dispatch => {
    const anecdote = await anecdoteService.updateVote(id)
      dispatch(IncrementVote(anecdote))
  }
}

export default anecdoteSlicer.reducer
