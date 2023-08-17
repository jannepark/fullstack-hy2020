import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
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
        password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      if(error.response.status === 401) {
        setNotification({
          message: `${error.response.data.error}`,
          type: 'error'
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      }
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    console.log("logging out")
    window.localStorage.clear()
    window.location.reload();
  }
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNotification({
          message: `Created new blog ${blogObject.title}`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      })
      .catch(error => {
        if(error.response.status === 401) {
          setNotification({
            message: `${error.response.data.error}`,
            type: 'error'
          });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        }
      })
    }
    
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
      <input
        value={newTitle}
        onChange={handleTitleChange}
      />
      </div>
      <div>
      Author:
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      </div>
      <div>
        URL:
      <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      </div>
      <button type="submit">save</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in  
        <button type="submit" onClick={handleLogout}>logout</button>
      </div>
      <h2>Create new</h2>
      {blogForm()}
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
