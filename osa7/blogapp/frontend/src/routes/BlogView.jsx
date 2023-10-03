import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'

const BlogView = ({ blogs, loggedInUser }) => {
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blog = blogs.find((n) => n.id === id)
  if (!blog) {
    return null
  }
  console.log(blog)
  const removeBlog = async () => {
    if (window.confirm('Do you really want delete this blog?')) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }
  const showDel = () => {
    if (loggedInUser.name === blog.user.name) {
      const response = (
        <button type="submit" onClick={removeBlog} id="removeBlog">
          delete
        </button>
      )
      return response
    }
    return null
  }
  const addLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id,
    }
    dispatch(setNotification(`Voted for: ${blog.title}`, 10))
    handleLikeBlog(blogObject)
  }
  const handleLikeBlog = async (blogObject) => {
    dispatch(likeBlog(blogObject.id))
  }
  return (
    <div>
      <div className="blogStyle">
        <div>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            <span id="countLikes"> {blog.likes} </span>
            <button type="submit" onClick={addLike} id="likeBlog">
              Like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <div>{showDel()}</div>
        </div>
      </div>
    </div>
  )
}
export default BlogView
