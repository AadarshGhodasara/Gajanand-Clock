import React from 'react'

const withCounter = WrapCounter => {
    class withCounter extends React.Component{
        constructor(){
            super();
            this.state = {
                count : 0
            }
        }
        incrementCounter = () => {
            this.setState({count : this.state.count + 1});
        }
        render(){
            return(
                <WrapCounter 
                    count={this.state.count}
                    incrementCounter={this.incrementCounter}  
                    {...this.props}
                />
            )
        }
    }
    return withCounter;
}

export default withCounter;