import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, bookAdded) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(bookAdded)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const tokenFromLocalStorage = localStorage.getItem('library-user-token')
  const [token, setToken] = useState(tokenFromLocalStorage)
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.clearStore().then(() => client.resetStore())
    setPage('authors')
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
      notify(`${bookAdded.title} added`)
    },
  })
  const notify = (message) => {
    window.alert(message)
    console.log(message)
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
            <button onClick={() => setPage('recommended')}>Recommended</button>
            <button onClick={handleLogout}>logout</button>
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} />
            <Authors show={page === 'authors'} />
            <Recommended show={page === 'recommended'} />
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
