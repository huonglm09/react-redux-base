import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import Login from '../components/Login/Login'

class LoginPage extends Component {
    componentDidMount() {
        document.title = "News | Login Page"        
    }

    render() {
        const {username, password, dispatchLogin} = this.props
        return (
            <div>
                <Login username={username} password={password} dispatchLogin={dispatchLogin}/ >
            </div>
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
    username: state.authReducer.username,
    password: state.authReducer.password
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch),
    dispatchLogin: (username, password) => {
        bindActionCreators(authActions, dispatch).midLogin({
            username: username,
            password: password
        });
    }
});

/**
 * Connect the component to
 * the Redux Store.
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
