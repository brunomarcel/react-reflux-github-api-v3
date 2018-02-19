import React from 'react';
import Reflux from 'reflux';

class User extends Reflux.Component {

	constructor(props) {
		super(props)
		this.state = { 
			user: {} 
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ user: nextProps.user })
	}

  render() {

		const dataUser = Object.keys(this.state.user).map((val, idx) => {
			let temp = ''
			if((val === 'type' || 
					val === 'company' || 
					val === 'blog' || 
					val === 'location' || 
					val === 'email' || 
					val === 'bio' || 
					val === 'public_repos' || 
					val === 'public_gists' || 
					val === 'followers' || 
					val === 'following') && 
					(this.state.user[val] !== null &&
					this.state.user[val] !== '')) {
				temp = <p key={idx}>{val}: {this.state.user[val]}</p>
			}
			return temp
		});

    return (
      <div id="user">
				<img id="user_avatar" src={this.state.user.avatar_url} alt={this.state.user.name} />
				<div id="user_infos">
					<h1>{this.state.user.name}</h1>
					{dataUser}
				</div>
      </div>
    );
  }
}

export default User;

