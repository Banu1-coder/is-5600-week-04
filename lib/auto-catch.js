module.exports = function autoCatch(handlers) {
  return Object.keys(handlers).reduce((wrappedHandlers, key) => {
    const handler = handlers[key];
    wrappedHandlers[key] = async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (err) {
        next(err);
      }
    };
    return wrappedHandlers;
  }, {});
};
