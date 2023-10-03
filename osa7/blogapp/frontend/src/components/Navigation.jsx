import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const navigation = ({ user }) => {
  const padding = {
    paddingRight: 5,
    paddingLeft: 5,
    color: 'white',
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user ? (
              <em>{user.name} logged in</em>
            ) : (
              <Link to="/login">login</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default navigation
