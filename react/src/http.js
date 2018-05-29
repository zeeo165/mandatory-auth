const axios         = require('axios');
const MockAdapter   = require('axios-mock-adapter');

// ...

const mock = new MockAdapter(axios);

// ...
// Example of user credentials to match against incoming credentials.
const username = 'me@domain.com';
const password = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends  = ['alice', 'bob'] 

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImJhbmFuYSBtYW4iLCJpYXQiOjE1MTYyMzkwMjJ9.g5aCTWCKXel5wUlRnLz2gb9m4JJz61jd-hq1oSL95NA';


mock.onPost('/api/auth').reply(config => {  //Mock har on post<? som kan referera till post genom rtutten vi ger den?
    const body = JSON.parse(config.data);
    if(username === body.body.username && password === body.body.password){
        return [200, {token}]
    }
    else{
        return [401, {error: 'Invalid user credentials'}]
    }
});

mock.onGet('/api/friends').reply(config => {
    const { headers } = config;

    if (headers.Authorization === `Bearer ${token}`){
        return [200, friends]
    }
    else if (headers === ``){
        return [400, {error: 'No Authorization Header'}]
    }
    else if (headers.Authorization !== `Bearer ${token}`){
        return [401, {error: 'Unauthorized Token'}]
    }
});

// if a request in not handled in the mocks above, this will return a generic 400 response.
mock.onAny().reply(400, { error: 'Unsupported request' });

// ...

export default axios;