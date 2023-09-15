import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdoteVote } from './requests/requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdoteVote,
    onSuccess: (returnedAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      const foundAnecdote = {...currentAnecdotes.find(n => n.id === returnedAnecdote.id)}
      foundAnecdote.votes += 1
      queryClient.setQueryData({queryKey: ['anecdotes']}, currentAnecdotes.map(anecdote =>
        anecdote.id !== returnedAnecdote.id ? anecdote : foundAnecdote
        ))
      dispatch({ type: 'showNotification',
       payload: 'You voted for: ' + returnedAnecdote.content})
      setTimeout(() => {
        dispatch({type: 'hideNotification'})
    }, 5000) 
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1 })
    // console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
