import React, { Component } from 'react';

class query extends Component {
    constructor(props) {
    super(props);

    this.state = {
        query: '',
    };

    this.updatequery = this.updatequery.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

}

    updatequery(event) {
        this.setState({query: event.target.value});
    }

    handleInputChange(enter) {
        enter.preventDefault();
        this.state.query = this.state.query.toLowerCase();
        this.props.search(this.state);
    }
    
    render () {
        return (
            <div>
                <form onSubmit = {this.handleInputChange}>
                    <input type="text"
                        placeholder="Search for Items"
                        ref={input => this.search = input}
                        onChange={this.updatequery}/>
                        <p>{this.state.search}</p>
                </form>
            </div>   
            
        )
    }
}

export default query