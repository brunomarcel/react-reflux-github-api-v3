import Reflux from 'reflux';
import Actions from './actions';

class Store extends Reflux.Store {
	
	constructor() {
		super();
		this.state = {
			user: {},
			repos: [],
			starred: []
		}
		this.listenables = Actions;
	}

	onGetUser(user) {
		fetch(`https://api.github.com/users/${user}`)
      .then(res => res.json())
			.then(
				(res) => {
					this.setState({ user: res, repos: [], starred: [] })
				},
				(error) => {
					console.log(error)
				}
			)

		this.setState({count: 7})
	}

	onGetRepos(user) {
		fetch(`https://api.github.com/users/${user}/repos`)
      .then(res => res.json())
			.then(
				(res) => {
					this.setState({ repos: res })
				},
				(error) => {
					console.log(error)
				}
			)

		this.setState({count: 7})
	}

	onGetStarred(user) {
		fetch(`https://api.github.com/users/${user}/starred`)
      .then(res => res.json())
			.then(
				(res) => {
					this.setState({ starred: res })
				},
				(error) => {
					console.log(error)
				}
			)

		this.setState({count: 7})
	}

}

export default Store;
