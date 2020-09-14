const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// Setting up the public directory
app.use(express.static('dist'));

app.listen(port, () => console.log(`listening on port ${port}!`));
