import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const [genreFilter, setgenreFilter] = useState('')
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 50000,
  })
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.flatMap((book) => book.genres))]

  const options = genres.map((genre) => ({
    value: genre,
    label: genre,
  }))
  const clearFilter = () => {
    setgenreFilter(null)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {books
            .filter((book) => {
              if (!genreFilter || !genreFilter.value) {
                return true
              }
              return book.genres.includes(genreFilter.value)
            })
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
                <td>{book.genres.join(', ')}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="App">
        <h3>Filter by Genre</h3>
        <Select
          value={genreFilter}
          onChange={setgenreFilter}
          placeholder="Select genre"
          options={options}
        />
        <button onClick={clearFilter}>Clear Filter</button>
      </div>
    </div>
  )
}

export default Books
