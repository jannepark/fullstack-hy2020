const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
        {
        "title": "pastaa2",
        "author": "rop3",
        "url": "www.goo3343gles.fi",
        "likes": "14"
      },
      {
        "title": "pastaa3",
        "author": "rop2",
        "url": "www.goo311343gles.fi",
        "likes": "1"
      },
]
beforeEach(async () => {
    await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
    })

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


test('a valid note can be added ', async () => {
    const newBlog = {
        "title": "pastaa322",
        "author": "rop33",
        "url": "www.goo311343gles.fi",
        "likes": "4"
      }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'pastaa322'
    )
})
test('default value of 0 is set, if likes field is missing', async () => {
  const newBlog = {
      "title": "pastaa322",
      "author": "rop33",
      "url": "www.goo311343gles.fi",
      // "likes": "4"
    }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  response.body.forEach(r => {
    if(r.title === "pastaa322") {
      expect(r.likes).toBe(0)
    }
  })
})
test('400 bad response is sent if title or url missing ', async () => {
  const newBlog = {
      // "title": "pastaa322",
      "author": "rop33",
      // "url": "www.goo311343gles.fi",
      "likes": "4"
    }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})
afterAll(async () => {
  await mongoose.connection.close()
})