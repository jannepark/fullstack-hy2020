import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Books = (props) => {
  const all_Books_result = useQuery(ALL_BOOKS, {})
  const me_result = useQuery(ME, {})

  if (!props.show) {
    return null
  }

  if (me_result.loading || all_Books_result.loading) {
    return <div>loading...</div>
  }

  const books = all_Books_result.data.allBooks
  const me = me_result.data.me

  const recommended = books.filter((book) => {
    if (book.genres.includes(me.favoriteGenre)) {
      return true
    }
    return false
  })

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre patterns</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {recommended.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
