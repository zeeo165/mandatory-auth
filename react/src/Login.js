import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = e => {        // update the component state with a change to either the username or password.
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {       // calls the passed callback from the parent <App> component.
        e.preventDefault();                                          
        this.props.onLogin(e.target.username.value, e.target.password.value);
    }



    render() {          // render a login form and perform manual validation.

        const enabled =
            this.state.username.length > 0 && this.state.password.length > 7;
    
        return (

            <div>
                <form onSubmit={this.onSubmit}>

                    <label>Username</label>
                    <input name="username" placeholder="me@domain.com" onChange={this.onChange}/>

                    <label>Password</label>
                    <input name="password"  placeholder="password" type="password" onChange={this.onChange}/>

                    <button disabled={!enabled} value="submit">Login</button>

                </form>
            </div>

        )
    }
};

export default Login;