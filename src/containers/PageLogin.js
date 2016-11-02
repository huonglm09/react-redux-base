// both
import React, { Component } from 'react'
// get
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// normal
import * as actionAuth from '../actions/auth'
import Login from '../components/Login/Login'

class PageLogin extends Component {
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
    username: state.reducerAuth.username,
    password: state.reducerAuth.password
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionAuth, dispatch),
    dispatchLogin: (username, password) => {
        bindActionCreators(actionAuth, dispatch).midLogin({
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
)(PageLogin);
