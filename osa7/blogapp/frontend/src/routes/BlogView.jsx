import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'
import { useState, useEffect } from 'react'

const BlogView = ({ loggedInUser }) => {
  const blogs = useSelector((state) => state.blog)
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = blogs.find((n) => n.id === id)
  const [text, setText] = useState('')

  if (!blog) {
    return null
  }
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

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = () => {
    console.log(blog.id, text)
    dispatch(commentBlog(blog.id, text))
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
          <div>
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Type something..."
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <ul>
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((commentObject) => (
                <li key={commentObject.id}>{commentObject.comment}</li>
              ))
            ) : (
              <li>No comments</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default BlogView
