import React, { Component, PropTypes } from 'react'
import './login.scss'

class Login extends Component {
    static propTypes = {
        username: PropTypes.string,
        password: PropTypes.string,
        dispatchLogin: PropTypes.func
    }

    handleClickLogin = (e) => {
        const { dispatchLogin } = this.props
        dispatchLogin(
            this.refs.username.value,
            this.refs.password.value
        );
    }

    render() {
          const { username, password } = this.props
          return (
                <div>
                      <label>
                            Username&nbsp;
                            <input defaultValue={username} type='text' ref="username" />
                      </label>
                      <label>
                            Password&nbsp;
                            <input defaultValue={password} type='password' ref="password" />
                      </label>
                      <button onClick={this.handleClickLogin}>Login</button>
                </div>
          )
    }
}

export default Login
