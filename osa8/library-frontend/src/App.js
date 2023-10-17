import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const tokenFromLocalStorage = localStorage.getItem('library-user-token')
  const [token, setToken] = useState(tokenFromLocalStorage)
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  console.log(token)
  return (
    <div>
      <div>
        {token ? (
          <>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={handleLogout}>logout</button>
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} />
            <Authors show={page === 'authors'} />
          </>
        ) : (
          <>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('login')}>login</button>
            <Books show={page === 'books'} />
            <Authors show={page === 'authors'} />
            <LoginForm
              show={page === 'login'}
              setToken={setToken}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
