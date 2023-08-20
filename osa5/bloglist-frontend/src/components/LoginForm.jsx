
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  notification
}) => {

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    notification: PropTypes.object.isRequired
  }

  return (
    <>
      <div>
        <h2>Login</h2>
        <Notification notification={notification} />
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </>
  )
}
export default LoginForm