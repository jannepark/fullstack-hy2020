import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const toggleViewAll = () => {
    setVisible(!visible)
    // console.log("nappi toimii")
  }

if(visible){
  return (
    <div className="blogStyle">
  <div>
    <p>
      {blog.title} 
      <button type="submit" onClick={toggleViewAll}>hide</button>
    </p>
    <p>{blog.author}</p>
    <p>{blog.url}</p>
    <p>{blog.likes} <button type="submit" onClick={null}>Like</button></p>
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