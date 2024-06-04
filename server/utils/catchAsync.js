
/**
 * Wraps a function to catch and pass any errors to the next middleware.
 *
 * @param {Function} func - The function to be wrapped.
 * @returns {Function} - A new function that wraps the provided function.
 *
 * @example
 * const errorCatcher = require('./errorCatcher');
 * const express = require('express');
 * const app = express();
 *
 */
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
