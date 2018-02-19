import React from 'react';
import Reflux from 'reflux';

class List extends Reflux.Component {

  render() {

    return (
      <ul className="list">
				<li><h3>{this.props.repo.name}</h3></li>
				<li>owner: {this.props.repo.owner.login}</li>
				<li>url: {this.props.repo.html_url}</li>
				<li>description: {this.props.repo.description}</li>
      </ul>
    );
  }
}

export default List;

