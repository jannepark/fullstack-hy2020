const Blog = ({blog}) => (
  <>
  <div>
    {blog.title} {blog.author}
  </div>
  <button type="submit" >view</button>
  </>  
)

export default Blog