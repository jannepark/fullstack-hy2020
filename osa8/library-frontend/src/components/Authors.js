import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [born, setborn] = useState('')
  const [name, setName] = useState('')
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 5000,
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      console.log(messages)
    },
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))
  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: name.value,
        setBornTo: parseInt(born, 10),
      },
    })
    console.log('add book...')
    setName('')
    setborn('')
  }
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div className="App">
          Name
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          Born
          <input
            value={born}
            onChange={({ target }) => setborn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors
