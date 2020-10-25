const express = require("express");
const router = new express.Router();
let {transactions}  = require("../transactions");
const {
  createTransaction,
  validateBody,
  validateTransactionId,
  findTransaction,
  validateTransaction,
  getBalance
  
} = require("../utils/transactions");
const Mutex = require("async-mutex").Mutex;

router.get("/history", async (req, res) => {
  res.send(transactions);
});

router.get("/", async (req, res) => {
  try {
    res.send({ balance: getBalance() });
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  let statusCode = 200;
  let rta;
  try {
    if (!validateTransactionId(req.params.id)) {
      statusCode = 400;
      throw "invalid ID supplied";
    }
    const rta = findTransaction(req.params.id);
    if (rta === undefined) {
      statusCode = 404;
      throw "transaction not found";
    }
    res.send(rta);
  } catch (e) {
    rta = e;
  } finally {
    res.status(statusCode).send(rta);
  }
});

router.post("/", async (req, res) => {
  const mutex = new Mutex();
  const release = await mutex.acquire();

  let statusCode = 201;
  try {
    if (!validateBody(req.body)) {
      statusCode = 400;
      throw "invalid input";
    } else if(!validateTransaction(req.body.type, req.body.amount)){
        statusCode = 400;
        throw "insufficient credit for the operation";
    }
    const transaction = createTransaction(req.body.type, req.body.amount);
    transactions.push(transaction);
    res.status(statusCode).send(transaction);
  } catch (e) {
    console.log(e);
    res.status(statusCode).send(e);
  } finally {
    release();
  }
});
module.exports = router;
