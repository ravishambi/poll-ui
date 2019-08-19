import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Description from './components/Description/Description';
import Login from './components/Login/Login';
import './App.css';
import Axios from 'axios';
//import SignupModal from './components/Signup/SignupModal';
import Signup from './components/Signup/Signup';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import history from './components/History';


class App extends Component {

  state = {
    usernameOrEmail: '',
    password: '',
    visited: false,
    signupClicked: false,
    authenticated: true
  }

  loginSubmiteHandler = () => {
    //alert(this.state.usernameOrEmail + " , " + this.state.password);
    this.setState({ visited: true });
    if (this.state.usernameOrEmail !== ''
      && this.state.password !== '') {
      const data = {};
      data.usernameOrEmail = this.state.usernameOrEmail;
      data.password = this.state.password;
      Axios.post('http://localhost:6541/api/auth/signin', data)
        .then(res => {
          if (res.status === 200) {
            history.push("/home");
            this.setState({
              visited: false,
              usernameOrEmail: '',
              password: '',
              authenticated: true
            });

          }

        })
        .catch(er => {
          alert("Invalid credentials!!");
        });
    }


  }

  usernameChangeHandler = (e) => {
    const updatedUsername = e.target.value;
    this.setState({
      usernameOrEmail: updatedUsername,
      visited: true
    });

  }

  passwordChangeHandler = (e) => {
    const updatedPassword = e.target.value;
    this.setState({
      password: updatedPassword,
      visited: true
    });
  }

  signupClickHandler = () => {
    this.setState({
      signupClicked: true
    });
  }

  render() {
    let defaultPage = (<Route path="/" exact
      component={() => <Login username={this.state.usernameOrEmail}
        password={this.state.password}
        clicked={this.loginSubmiteHandler}
        usernameChanged={this.usernameChangeHandler}
        passwordChanged={this.passwordChangeHandler}
        visited={this.state.visited}
      ></Login>} />);
      if(this.state.authenticated){
        defaultPage = (<Route path="/" component={() => <Home></Home>} />)
      }

    return (
      <BrowserRouter>
        <div>
          <NavBar signupClicked={this.signupClickHandler} authenticated={this.state.authenticated}></NavBar>

          { defaultPage }

          <Route path="/signup" exact
            component={() => <Signup />} />

          

          <Description></Description>
        </div>
      </BrowserRouter>

    );
  }

}



export default App