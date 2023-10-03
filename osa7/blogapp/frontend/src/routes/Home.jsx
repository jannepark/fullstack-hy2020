import { useRef } from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const Home = ({ user, blogs }) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }
  return (
    <>
      <h2>Create new</h2>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs && blogs.length > 0 ? (
          [...blogs]
            .sort((i, j) => j.likes - i.likes)
            .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
        ) : (
          <p>Loading blogs...</p>
        )}
      </div>
    </>
  )
}
export default Home
