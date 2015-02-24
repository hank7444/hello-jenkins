var express = require('express');

var app = express();
// 1235
app.get('/', function (req, res) {
  res.send('hello jenkins test');
});

app.listen(process.env.PORT || 5000);

module.exports = app;
