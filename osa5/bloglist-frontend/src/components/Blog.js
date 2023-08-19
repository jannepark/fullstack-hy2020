import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs, blogs}) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const toggleViewAll = () => {
    setVisible(!visible)
  }

  const likeBlog = async () => {
    try {
      const newLikes = likes + 1
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes,
        user: blog.user.id
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
  
  const removeBlog = async () => {
    try { 
      console.log(user,blog.user.id)
      if(user.name === blog.user.name) {
        console.log("Täsmää")
        if (window.confirm("Do you really want delete this blog?")) {
          console.log("poistetaan")
          const response = await blogService.remove(blog.id)
          const toRemoveId = blog.id
          setBlogs((blogs) =>
          blogs.filter((blog) => blog.id !== toRemoveId))

          return response
        }
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const showDel = () => {
    if(user.name === blog.user.name) {
      return <button type="submit" onClick={removeBlog}>delete</button>
    }
    return null
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
        <div>
          {showDel()}
        </div>
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