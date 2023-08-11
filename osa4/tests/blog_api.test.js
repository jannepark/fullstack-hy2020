const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
        {
        "title": "Seitsemän veljestä",
        "author": "Aleksis Kivi",
        "url": "www.blogi.fi",
        "likes": "7"
      },
      {
        "title": "Kalevala",
        "author": "Elias Lönnrot",
        "url": "www.blogi2.fi",
        "likes": "3"
      },
]
beforeEach(async () => {
    await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
    })

describe('returning of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs id is id', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach(r => {
          expect(r.id).toBeDefined()
      })
  })
})
describe('addition of a new blog', () => {
  test('a valid note can be added ', async () => {
    const newBlog = {
        "title": "Uusi_blogi",
        "author": "Tuntematon",
        "url": "www.blogi3.fi",
        "likes": "1"
      }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('Uusi_blogi')
})
  test('default value of 0 is set, if likes field is missing', async () => {
    const newBlog = {
      "title": "Uusi_blogi",
      "author": "Tuntematon",
      "url": "www.blogi3.fi",
      // "likes": "1"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    response.body.forEach(r => {
      if(r.title === "Uusi_blogi") {
        expect(r.likes).toBe(0)
      }
    })
  })
  test('400 bad response is sent if title or url missing ', async () => {
    const newBlog = {
      // "title": "Uusi_blogi",
      "author": "Tuntematon",
      // "url": "www.blogi3.fi",
      "likes": "1"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})
describe('deletion of a blog', () => {
  test('deletetion of blog succeeds with status code 204 if id is valid', async () => {
    const responseInitial = await api.get('/api/blogs')
    const blogToDelete = responseInitial.body[1]
    console.log(blogToDelete)

    const response = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
    
    const responseAfterDel = await api.get('/api/blogs')
    expect(responseAfterDel.body).toHaveLength(initialBlogs.length - 1)
  })
})

describe('update of a blog', () => {
  test('updating blog likes succeeds with new blog returned, ', async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]
    blogToUpdate.likes = 99

    const updatedBlogResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

    expect(updatedBlogResponse.body.likes).toBe(99)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})