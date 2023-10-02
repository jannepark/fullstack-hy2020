import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlicer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    IncrementVote(state, action) {
      console.log(action, 'ttööt')
      const id = action.payload.id
      console.log({ ...state.find((n) => n.id === id) }, 'no selöytyi')
      const blogToVote = { ...state.find((n) => n.id === id) }
      blogToVote.likes += 1
      console.log(blogToVote, 'noooo')
      return state.map((blog) => (blog.id !== id ? blog : blogToVote))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { IncrementVote, appendBlog, setBlogs, removeBlog } =
  blogSlicer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log(blogs, 'tööt')
    // in the 'tööt' console.log blogs is an array of blog objects
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}
export const voteBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.updateVote(id)
    console.log(blog, 'ahaa')
    dispatch(IncrementVote(blog))
  }
}
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Blog ${blog.title} deleted`, 5))
    } catch (error) {
      dispatch(setNotification)(error)
    }
  }
}

export default blogSlicer.reducer
