import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    // blogService.setToken(user.token)    
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
      window.localStorage.setItem(        
        'loggedNoteappUser', JSON.stringify(user)      
        ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception, "jotain kämmäs")
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    console.log("logging out")
    window.localStorage.clear()
    window.location.reload();
  }
  const addblog = (event) => {
    event.preventDefault()
    const blogObject = {
      tile: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setNotes(notes.concat(returnedBlog))
        setNewNote('')
      })
  }
  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
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
      <div>
     {user.name} logged in 
     <button type="submit" onClick={handleLogout}>logout</button>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    <Form onSubmit={addBlog}>
      <div>
        title
        <input
        type="text"
        value={title}
        name="title"
        onChange={({ target })} => 

      </div>
    </Form>
    </div>
  )
}

export default App
