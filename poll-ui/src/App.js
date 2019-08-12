import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Description from './components/Description/Description';
import Login from './components/Login/Login';
import './App.css';
import Axios from 'axios';
//import SignupModal from './components/Signup/SignupModal';
import Signup from './components/Signup/Signup';


class App extends Component {

  state = {
    usernameOrEmail: '',
    password: '',
    visited: false,
    signupClicked: false
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
            this.setState({
              visited: false,
              usernameOrEmail: '',
              password: ''
            });
            alert("signin successfully!!")
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
    const signupOrLogin = this.state.signupClicked ? <Signup></Signup> :
      (<Login username={this.state.usernameOrEmail}
        password={this.state.password}
        clicked={this.loginSubmiteHandler}
        usernameChanged={this.usernameChangeHandler}
        passwordChanged={this.passwordChangeHandler}
        visited={this.state.visited}
      ></Login>)
    return (
      <div>
        <NavBar signupClicked={this.signupClickHandler}></NavBar>
        { signupOrLogin }
        <Description></Description>
      </div>

    );
  }

}



export default App