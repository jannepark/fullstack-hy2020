import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const toggleViewAll = () => {
    setVisible(!visible)
  }
  const likeBlog = async () => {
    try {
      const newLikes = likes +1 

      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes,
        user: blog.user
      }
      const response = await blogService.update(blog.id, blogObject)
      setLikes(likes + 1)
      console.log(likes)
      return response
    }
    catch (error) {
      console.log(error)
    }
  }

  if (visible) {
    return (
      <div className="blogStyle">
        <div>
          <p>
            {blog.title}
            <button type="submit" onClick={toggleViewAll}>hide</button>
          </p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>{likes} 
          <button type="submit" onClick={likeBlog}>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="blogStyle">
        <p>
          {blog.title} -  {blog.author}
          <button type="submit" onClick={toggleViewAll}>view</button>
        </p>

      </div>

    </>
  )
}

export default Blog