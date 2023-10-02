import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  return (
    <>
      <div>
        <h2>Login</h2>
        <Notification />
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
              id="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
              id="password"
            />
          </div>
          <button type="submit" id="login-button">
            login{' '}
          </button>
        </form>
        <p>Department of Computer Science, University of Helsinki 2023</p>
      </div>
    </>
  )
}
export default LoginForm
