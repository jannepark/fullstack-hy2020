import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import Filter from './Filter'

  const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(item => 
            item.content.toLowerCase().includes(state.filter.toLowerCase())
          )
  })
    return (
        <div>
            <Filter />
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