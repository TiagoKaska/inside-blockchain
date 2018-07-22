var StellarSdk = require('stellar-sdk');
var request = require('request');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

var pair = StellarSdk.Keypair.random();

request.get({
  url: 'https://friendbot.stellar.org',
  qs: { addr: pair.publicKey() },
  json: true
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS! You have a new account :)\n', body);
    loadAccount();
  }
});

function loadAccount(){

server.loadAccount(pair.publicKey()).then(function(account) {
    console.log('Balances for account: ' + pair.publicKey());
    account.balances.forEach(function(balance) {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    });
  });
}

//console.log(pair.secret());

//console.log(pair.publicKey());
