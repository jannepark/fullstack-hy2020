import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl)
      .then(res => { 
        return res.data;
      });
  }
export const createAnecdote = (newAnecdote) => {
    const objectAnecdote = { newAnecdote, votes: 0 }
    return axios.post(baseUrl, objectAnecdote).then(res => {
        return res.data;
    })
}
  