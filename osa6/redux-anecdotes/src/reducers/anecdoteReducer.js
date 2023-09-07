import { createSlice } from '@reduxjs/toolkit'


const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))

const  anecdoteSlicer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdoteOf(state, action) {

      state.push(
        action.payload
      )
    },
    voteOf(state, action) {
      const id = action.payload
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

export const { addAnecdoteOf, voteOf, appendAnecdote,setAnecdote} = anecdoteSlicer.actions 
export default anecdoteSlicer.reducer
