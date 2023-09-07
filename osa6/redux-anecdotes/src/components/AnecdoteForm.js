import { useDispatch } from 'react-redux'
import { addAnecdoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const toSent = addAnecdoteOf(content)
        const NewAnecdote = await anecdoteService.createNew(toSent)
        dispatch(addAnecdoteOf(NewAnecdote))
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