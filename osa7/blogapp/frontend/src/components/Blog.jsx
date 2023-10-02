import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, setBlogs, handleLikeBlog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const toggleViewAll = () => {
    setVisible(!visible)
  }
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
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

  const removeBlog = async () => {
    if (window.confirm('Do you really want delete this blog?')) {
      dispatch(deleteBlog(blog))
    }
  }

  const showDel = () => {
    if (user.name === blog.user.name) {
      const response = (
        <button type="submit" onClick={removeBlog} id="removeBlog">
          delete
        </button>
      )
      return response
    }
    return null
  }

  if (visible) {
    return (
      <div className="blogStyle">
        <div>
          <p>
            {blog.title}
            <button type="submit" onClick={toggleViewAll} id="hideBlogInfo">
              hide
            </button>
          </p>
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
    )
  }
  return (
    <>
      <div className="blogStyle">
        <p>
          {blog.title} - {blog.author}
          <button type="submit" onClick={toggleViewAll} id="viewBlogInfo">
            view
          </button>
        </p>
      </div>
    </>
  )
}

export default Blog
