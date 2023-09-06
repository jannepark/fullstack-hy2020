import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = {
  anecdotes: [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ],
  filter: ''
}
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.anecdotes.map(asObject)

const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))

const  anecdoteSlicer = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    addAnecdoteOf(state, action) {
      const content = action.payload
      state.push({
        content,
        id: generateId(),
        votes: 0
      })
    },
    voteOf(state, action) {
      const id = action.payload
        const anecdoteToVote = {...state.find(n => n.id === id)}
        anecdoteToVote.votes += 1
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : anecdoteToVote
          )
    }
  }
})

export const { addAnecdoteOf, voteOf} = anecdoteSlicer.actions 
export default anecdoteSlicer.reducer
