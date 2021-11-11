let socket = require('socket.io-client')(process.env.BACKEND_URL, {
    query: {
        'token': localStorage.getItem('token')
    }
});

export default socket;