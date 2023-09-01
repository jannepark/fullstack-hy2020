import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'

  const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    
    return (
        <div>
        {anecdotes
        .sort(( i, j ) => j.votes - i.votes)
        .map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(voteOf(anecdote.id))}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
  }
  export default Anecdotes