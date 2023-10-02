import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blog)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
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
  const handleLikeBlog = async (blogObject) => {
    try {
      dispatch(likeBlog(blogObject.id))
    } catch (error) {
      console.log(error)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    // try {
    //   dispatch(createBlog(blogObject))
    //   dispatch(setNotification(`Created new blog ${blogObject.title}`, 5))
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     dispatch(setNotification(error.response.data.error, 5))
    //   }
    // }
  }

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        // notification={notification}
      />
    )
  }
  return (
    <>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in
          <button type="submit" onClick={handleLogout} id="logout">
            logout
          </button>
        </div>
      </div>
      <h2>Create new</h2>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs && blogs.length > 0 ? (
          [...blogs]
            .sort((i, j) => j.likes - i.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLikeBlog={handleLikeBlog}
              />
            ))
        ) : (
          <p>Loading blogs...</p>
        )}
      </div>
    </>
  )
}

export default App
