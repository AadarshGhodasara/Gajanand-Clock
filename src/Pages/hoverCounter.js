import React, { Component } from 'react'
import withCounter from './withCounter';
class hoverCounter extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         count:0
    //     }
    // }
    // incrementCounter = () => {
    //     this.setState({count : this.state.count + 1});
    // }
    render() {
        const {count, incrementCounter} = this.props;
        return (
            <div onMouseOver={incrementCounter}>
                Hovered {count} times
            </div>
        )
    }
}

export default withCounter(hoverCounter);
