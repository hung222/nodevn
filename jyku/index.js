const express = require("express")
const app = express()


const server_port = process.env.PORT || 3000;
app.listen(server_port, function() {
    console.log('Listening on port ', server_port);
});
