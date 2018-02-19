import React, { Component } from 'react';
import Search from '../search'
import './style.css';

class App extends Component {

  render() {
    return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">React + Reflux + GitHub API v3</h1>
				</header>
				<Search />
			</div>
    );
  }
}

export default App;
