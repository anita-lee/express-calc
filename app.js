/** Simple demo Express app. */

const express = require("express");
const { findMode, findMedian, findMean } = require("./stats");
const { convertStrNums } = require("./utils.js");
const app = express();

// useful error class to throw
const { BadRequestError, NotFoundError } = require("./expressError");
//TODO: add any other errors that we respond with

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res){
  if (!req.query.nums) throw new BadRequestError(MISSING);

  const strNums = req.query.nums.split(",");
  const nums = convertStrNums(strNums);
  return res.json({
    operation: "mean",
    value: findMean(nums),
  });
})

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;