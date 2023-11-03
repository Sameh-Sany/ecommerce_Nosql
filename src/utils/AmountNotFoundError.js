const BaseError = require("./BaseError");

class AmountNotFoundError extends BaseError {
  constructor(balance = "balance") {
    super(` Amount was not found.`);
    this.statusCode = 422;
    this.errors = [
      {
        msg: `Your ${balance} is currently not enough to this transaction`,
      },
    ];
  }
}

module.exports = AmountNotFoundError;
