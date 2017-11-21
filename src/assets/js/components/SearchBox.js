import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  onSearch = (event) => {
    if (event.key !== 'Enter') return;

    let {query} = this.state;    
    this.props.history.push(`/search/${query}`);
  }

  updateQuery = (newQuery) => this.setState({query: newQuery});

  render() {
    return (<div className="form-group">
      <input type="text" placeholder="Search" className="form-control"
        onKeyPress={this.onSearch}
        onChange={(e) => this.updateQuery(e.target.value)} />
    </div>);
  }
};

export default withRouter(SearchBox);