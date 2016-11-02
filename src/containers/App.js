// both
import React, {Component, PropTypes} from 'react'

class App extends Component {
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
