import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, {Fragment,Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';
import axios from 'axios';




class App extends Component {

  state = {
    
    users: [],
    user: {},
    repos :[],
    loading: false,
    alert: null
  }

  /*async componentDidMount() {
    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    const res =
      await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data, loading: false });
  }*/
  //search Github user
  searchUsers = async text => {
    const res =
      await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false });
    console.log(text);
  };

  //Get single user

  getUser = async username => {
    const res =
    await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ user: res.data, loading: true });
    console.log(username);
  };

// User Repos

getUserRepos = async username => {
  const res =
  await axios.get(`https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  this.setState({ repos: res.data, loading: true });
  console.log(username);
};


  // clear users from sate 
  clearUsers = () => this.setState({ users: [], loading: false })

  // set Aleret
  setAlert = (msg, type) => {

    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 1000);
  }
  render() {

    const { users, user,repos, loading } = this.state;
    return (
      <Router>
        <div className="App">

          <Navbar />

          <div className='container'>

            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUser={this.clearUsers}
                    showClear={users.length> 0 ? true : false}
                    setAlert={this.setAlert} />
                  <Users users={users} />
                </Fragment>
              )} />

              <Route exact path ='/about' component ={About}/>
              <Route exact path ='/user/:login' render ={props => (
                <User {...props} getUser = {this.getUser} 
                getUserRepos = {this.getUserRepos}
                user ={user}
                repos={repos}/>


              )}/>
            </Switch>



          </div>
        </div>
      </Router>

    );
  }
}
export default App;
