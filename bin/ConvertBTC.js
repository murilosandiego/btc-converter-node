"use strict";

var request = require('request');

var chalk = require('chalk');

var ora = require('ora');

var spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow'
});

function convertBTC() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1';
  var url = "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=".concat(currency, "&amount=").concat(amount);
  spinner.start();
  request(url, function (_error, response, body) {
    var apiResponse;
    spinner.stop();

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      return parseError;
    }

    console.log("".concat(chalk.red(amount), " BTC to ").concat(chalk.cyan(currency), " = ").concat(chalk.yellow(apiResponse.price)));
  });
}

module.exports = convertBTC;