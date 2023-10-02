import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
}
const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}
const updateVote = async (id) => {
  console.log(id, 'mikä id')

  const anecdoteToChange = await axios.get(
    `${baseUrl}/${'64da13cd515c92bb22674308'}`,
  )
  console.log(id, 'tässä')
  const anecdote = anecdoteToChange.data
  anecdote.votes += 1
  const response = await axios.put(`${baseUrl}/${id}`, anecdote)

  return response.data
  //   const config = {
  //     headers: { Authorization: token },
  //   }

  //   const blogToLike = await get(id)

  //   const response = await axios.put(
  //     `${baseUrl}/${id}`,
  //     { ...blogToLike, likes: blogToLike.likes + 1 },
  //     config,
  //   )
  //   return response.data
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll, create, setToken, update, remove, updateVote }
