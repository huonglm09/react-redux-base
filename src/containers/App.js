import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'

class App extends Component {

    handleChange = nextValue => {
        browserHistory.push(`/${nextValue}`)
    }

    render() {
        return (
            <div className="wrapper">
                {this.props.children}                
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
};

export default App;
