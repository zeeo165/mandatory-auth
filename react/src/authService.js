
//import {axios as http} from './http';       // import axios with the alias 'http'. 
import http from './http';

const jwt_decode = require('jwt-decode');

// ...

class AuthService {

    // the decoded token if the user has been authenticated, carrying information about the user.
    user;

    constructor() {
        // perform any logic upon application startup here...
        this.user = JSON.parse(localStorage.getItem('token')) || { authenticated : false, showError : false }
    }

    // use this method to catch http errors. 
    handleError(error) {
        throw error.data;
    }

    // convenience method to get authentication state for a user, which should include the 'user' class property; 
    // this method is used in the <App> component.
    getAuthState() {
        return( 
            this.user
        )
    }

    login(credentials) {

        // invoke the relevant API route for authenticating the user with the given credentials and return a Promise
        // that fulfills with authentication state.
        // 
        // Make sure to handle a successful authentication by storing and also decoding the returned token, as well as
        // catching http errors. 
        
        // return ...
        return  (
            http.post('/api/auth',{body:credentials})
                .then(response => {
                    this.user = jwt_decode(response.data.token)
                    this.user.token = response.data.token
                    this.user.authenticated = true
                    localStorage.setItem('token', JSON.stringify(this.user))
                })
                .catch(error => {
                    this.user.showError = true
                    this.handleError(error.response)
                })
        )
    }
    
    logout() {
        // logout the current user by removing the corresponding token. 
       localStorage.removeItem('token')
       this.user = {authenticated : false}
       return this.user
    }
    
    getResource(resource) {
        // invoke a protected API route by including the Authorization header and return a Promise that fulfills 
        // with the response body. 
        //
        // If e.g. invoking /api/friends, the 'resource' parameter should equal 'friends'.
        return (
            http.get(`/api/${resource}`,{headers: {Authorization: `Bearer ${this.user.token}`} } ) )
            .then( response => {
                return  response.data } )
            .catch(error => this.handleError(error.response) )
    }
}

export default new AuthService();