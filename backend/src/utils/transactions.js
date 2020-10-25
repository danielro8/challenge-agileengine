const uuid = require("uuid");
let { transactions, balance } = require("../transactions");

const createTransaction = (type, amount) => {
  balance += type === "credit" ? amount : -amount;
  return {
    id: uuid.v1(),
    type,
    amount,
    effectiveDate: new Date().toISOString(),
  };
};

const validateTransactionId = (id) => {
  return uuid.validate(id);
};

const findTransaction = (id) => {
  return transactions.find((transaction) => transaction.id === id);
};

const validateTransaction = (type, amount) => {
  return type === "credit" ? true : (balance - amount) < 0 ? false : true;
};

const validateBody = (body) => {
  if (
    !body || body.type === undefined ||
    (body.type.toLowerCase() !== "credit" &&
      body.type.toLowerCase() !== "debit")
  ) {
    return false;
  } else if (
    !body || body.amount === undefined || isNaN(body.amount) || body.amount <= 0
  ) {
    return false;
  }

  return true;
};

const getBalance = () => balance;

module.exports = {
  createTransaction,
  validateBody,
  validateTransactionId,
  findTransaction,
  validateTransaction,
  getBalance,
};
