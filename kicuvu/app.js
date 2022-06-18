var express = require("express");
var app = express();

// Set template engine
app.set('view engine', 'ejs')

// Bind the app to a specified port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);

// Super simple algorithm to find largest prime <= n
var calculatePrime = function(n){
  var prime = 1;
  for (var i = n; i > 1; i--) {
    var is_prime = true;
    for (var j = 2; j < i; j++) {
      if (i % j == 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      prime = i;
      break;
    }
  }
  return prime;
}

// Set up the GET route
app.get('/', function (req, res) {
  if(req.query.n) {
    // Calculate prime and render view
    var prime = calculatePrime(req.query.n);
    res.render('index', { n: req.query.n, prime: prime});
  }
  else {
    // Render view without prime
    res.render('index', {});
  }
});
// ...

var validate = function(req, res, next) {
  if(req.query.n) {
    number = parseInt(req.query.n, 10);
    if(isNaN(number) || number < 1 || number > 10000){
      res.render('index', {error: 'Please submit a valid number between 1 and 10000.'});
      return;
    }
    req.query.n = number;
  }
  next();
}

app.get('/', validate, function (req, res) {
  // ...
<!-- Show the result -->
<!-- ... -->

<!-- Error handling -->
<% if (locals.error) { %>
  <div class="alert alert-danger">
    <p class="lead"><%= error %></p>
  </div>
<% } %>
// ...

var memjs = require('memjs')
var mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,  // default: false
  timeout: 1,      // default: 0.5 (seconds)
  keepAlive: true  // default: false
})

// ...
app.get('/', validate, function (req, res) {
  if(req.query.n) {
    var prime;
    var prime_key = 'prime.' + req.query.n;
    // Look in cache
    mc.get(prime_key, function(err, val) {
      if(err == null && val != null) {
        // Found it!
        prime = parseInt(val)
      }
      else {
        // Prime not in cache (calculate and store)
        prime = calculatePrime(req.query.n)
        mc.set(prime_key, '' + prime, {expires:0}, function(err, val){/* handle error */})
      }
      // Render view with prime
      res.render('index', { n: req.query.n, prime: prime });
    })
  }
  else {
    // Render view without prime
    res.render('index', {});
  }
});

// ...
var cacheView = function(req, res, next) {
  var view_key = '_view_cache_' + req.originalUrl || req.url;
  mc.get(view_key, function(err, val) {
    if(err == null && val != null) {
      // Found the rendered view -> send it immediately
      res.send(val.toString('utf8'));
      return;
    }
    // Cache the rendered view for future requests
    res.sendRes = res.send
    res.send = function(body){
      mc.set(view_key, body, {expires:0}, function(err, val){/* handle error */})
      res.sendRes(body);
    }
    next();
  });
}

app.get('/', validate, cacheView, function (req, res) {
  // ...
app.post('/', function (req, res) {
  mc.delete('_view_cache_/?n=' + req.body.n, function(err, val){/* handle error */});
  likes[req.query.n] = (likes[req.query.n] || 0) + 1
  res.redirect('/?n=' + req.query.n)
});
var session = require('express-session');
var MemcachedStore = require('connect-memjs')(session);

// Session config
app.use(session({
  secret: 'ClydeIsASquirrel',
  resave: 'false',
  saveUninitialized: 'false',
  store: new MemcachedStore({
    servers: [process.env.MEMCACHIER_SERVERS],
    prefix: '_session_'
  })
}));

//...
