require('dotenv').config();

const {server} = require('./api');

server.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}`);
})
