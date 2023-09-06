import { useDispatch } from 'react-redux'
import { addAnecdoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {

    const dispatch = useDispatch()
    const addAnecdote = (event) => {

        event.preventDefault()
        const content = event.target.anecdote.value
        const toSent = addAnecdoteOf(content)
        dispatch(toSent)
        dispatch(setNotification(content))
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