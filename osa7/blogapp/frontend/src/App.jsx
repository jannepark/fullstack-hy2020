import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import {
  initializeLoggedInUser,
  loginUser,
  initializeAllUsers,
} from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './routes/Home'
import UsersList from './routes/UsersList'
import UserBlogs from './routes/UserBlogs'
import BlogView from './routes/BlogView.jsx'
import { Navbar } from 'react-bootstrap'
import Navigation from './components/Navigation'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.loggedInUser)
  const blogs = useSelector((state) => state.blog)
  const users = useSelector((state) => state.user.users)

  useEffect(() => {
    dispatch(initializeLoggedInUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setNotification(`${error.response.data.error}`, 5))
      }
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.clear()
    window.location.reload()
  }

  if (loggedInUser === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }
  return (
    <>
      <div className="container">
        <Navigation user={loggedInUser} />
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            {loggedInUser.name} logged in
            <button type="submit" onClick={handleLogout} id="logout">
              logout
            </button>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={<Home user={loggedInUser} blogs={blogs} />}
          />
          <Route path="/users" element={<UsersList users={users} />} />
          <Route path="/users/:id" element={<UserBlogs users={users} />} />
          <Route
            path="/blogs/:id"
            element={<BlogView blogs={blogs} loggedInUser={loggedInUser} />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
