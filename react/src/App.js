import React, { Component } from 'react';

import AuthService from './authService';
import Login from './Login';

class App extends Component {

    state = AuthService.getAuthState();              // get the initial state from AuthService. 

    login = (username, password) => {               // login the user with the given credentials and update the component state upon success or failure respectively.
      
        AuthService.login({username, password})      //Authservice förväntar sig bara en inparameter .. sedan förväntar den sig ett svar
        .then( () => {
            this.setState(AuthService.getAuthState())
            this.setState(this.state.showError = false)
        })
        .catch( error => {
            this.setState(AuthService.getAuthState())
            console.log(error)
        })   
    };

    logout = () => {                           // logout the user and update the component with state given by AuthService.
        AuthService.logout()
        this.setState( AuthService.getAuthState() )
        console.log("Loggedout!")
    };

    testApi() {                            // test access to a protected API route and log the results.
        AuthService.getResource('friends')
        .then( response => console.log(response) )
        .catch( error => console.log(error) )
    }

    render() {                               // complete the JSX code below to show the proper markup depending on whether or not the user has been authenticated.
        
        const userAlias = this.state.name;
        const isLoggedIn = this.state.authenticated;
        const error = this.state.showError;

        return (
            <div className="container">
            
                { error === true  ? <p className="error">Login credentials were incorrect!</p> : null } 

                <div className="status">
                    <span>User ID:  {isLoggedIn === true ? userAlias : 'N/A'} </span>
                    <button onClick={this.testApi}>Test API</button>

                    { isLoggedIn === true ? <button onClick= { this.logout }> Logout </button> : null }

                </div>

               { isLoggedIn === true ? null : <Login  onLogin={this.login} />}

            </div>
        );
    }
}

export default App;