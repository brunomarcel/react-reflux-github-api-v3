import React from 'react';
import Reflux from 'reflux';
import Store from './store';
import Actions from './actions';
import User from "../user"
import List from "../list"
import createHistory from "history/createBrowserHistory"

const history = createHistory()

class Search extends Reflux.Component {

	constructor(props) {
		super(props)
		this.state = { 
			input: "",
			showRepos: false,
			showStarred: false,
			title: ""
		}
		this.store = Store
		this.search = ''
		this.handleChange = this.handleChange.bind(this)
		this.clickRepos = this.clickRepos.bind(this)
		this.clickStarred = this.clickStarred.bind(this)
	}

	componentDidMount() {
		if(history.location.pathname !== '/') {
			let user  = history.location.pathname.replace('/', '')	
			this.state.input = user
			Actions.getUser(user)	
		}
		
  }

	/*
	 * https://api.github.com/users/USER_GITHUB
	 * Pega o valor digitado no input e faz a busca
	 *
	 */ 
	handleChange(e) {
		this.state.input = e.target.value
		clearTimeout(this.search)
		this.search = setTimeout(() => {
			this.state.title = ""
			history.push(`/${this.state.input}`)				
			Actions.getUser(this.state.input)	
		},1000)
	}

	/*
	 * https://api.github.com/users/USER_GITHUB/repos
	 * Função disparada no click
	 * Pega os dados dos repositórios e salva na store
	 *
	 */ 
	clickRepos() {
		Actions.getRepos(this.state.input)
		this.state.title = "Repos"
		this.state.showRepos = true
		this.state.showStarred = false
	}

	/*
	 * https://api.github.com/users/USER_GITHUB/starred
	 * Função disparada no click
	 * Pega os dados dos repositórios favoritados e salva na store
	 *
	 */ 
	clickStarred() {
		Actions.getStarred(this.state.input)
		this.state.title = "Starred"
		this.state.showStarred = true
		this.state.showRepos = false
	}

  render() {
		  
		let repos;
		if(this.state.showRepos) { 
			repos = this.state.repos.map(function (value, index) {
				return (
					<List key={index} repo={value} />				
				)
			})
		}

		let starred
		if(this.state.showStarred) { 
			starred = this.state.starred.map(function (value, index) {
				return (
					<List key={index} repo={value} />				
				)
			})
		}

    return (
      <div id="main">
				<input id="search" placeholder="Search for user" type="text" onChange={this.handleChange} />
				<User user={this.state.user} />
				<button onClick={this.clickRepos}>Repos</button>	
				<button onClick={this.clickStarred}>Starred</button>	
				<h2 id="listTitle">{this.state.title}</h2>
				{repos}
				{starred}
      </div>
    );
  }
}

export default Search;

