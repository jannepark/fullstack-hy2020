import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { createAnecdote } from '../requests/requests'
// import { useContext } from 'react'
// import { useAnecdoteDispatch } from '../AnecdoteContext'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({queryKey: ['anecdotes']}, currentAnecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatch({ type: 'showNotification', payload: 'Error: ' + error.response.data.error})
      setTimeout(() => {
        dispatch({type: 'hideNotification'})
    }, 5000) 
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
