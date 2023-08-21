import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('Blog', () => {
  test('renders title, author on default, but not url', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'kivi',
      url: 'www.osoite.fi'
    }

    render(<Blog blog={blog} />)
    screen.getByText(
      'Component testing is done with react-testing-library', { exact: false }
    )
    screen.getByText(
      'kivi', { exact: false }
    )
    const element = screen.queryByText('uwww.osoite.fi')
    expect(element).toBeNull()
  })
  test('renders blogs all fields when button view is pushed', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library2',
      author: 'kivi2',
      url: 'www.osoite.fi',
      likes: 99,
      user: {
        username: 'root',
        name: 'Superuser'
      }
    }
    const mockHandler = jest.fn()

    render(
      <Blog
        blog={blog}
        user={{ username: 'root', name: 'Superuser' }}
        setBlogs={() => console.log('lisäys')}
        handleLikes={mockHandler}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    screen.getByText(
      'www.osoite.fi', { exact: false }
    )
    screen.getByText(
      '99', { exact: false }
    )
  })
})