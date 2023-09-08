import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(state => {
    console.log(JSON.parse(JSON.stringify(state)))
    if (state.filter === '') {
      return state.anecdotes
    }

    return state.anecdotes.filter(item =>
      item.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  
  return (
    <div>
      {anecdotes
        .slice()
        .sort((i, j) => {
          return j.votes - i.votes;
        })
        .map(anecdote => {
          return (
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => 
                  dispatch(voteAnecdote(anecdote.id),
                  dispatch(setNotification(`Voted for: ${anecdote.content}`, 10)))
                  }>vote</button>
              </div>
            </div>
          )
        }
        )}
    </div>
  )

}
export default Anecdotes