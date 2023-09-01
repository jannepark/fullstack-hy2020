import { useDispatch } from 'react-redux'
import { addAnecdoteOf } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

    const dispatch = useDispatch()
    const addAnecdote = (event) => {

        event.preventDefault()
        const content = event.target.anecdote.value
        const toSent = addAnecdoteOf(content)
        dispatch(toSent)
    }
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
      </div>
    )
}
export default NewAnecdote