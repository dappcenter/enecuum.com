const LRU = require('lru-cache');

module.exports = function nuxtComponentCache(options) {
  if (this.options.render.ssr === false) {
    return
  }
  if (typeof this.options.render.bundleRenderer !== 'object' || this.options.render.bundleRenderer === null) {
    this.options.render.bundleRenderer = {}
  }
  if (this.options.render.bundleRenderer.cache) {
    return
  }
  this.options.render.bundleRenderer.cache = LRU(Object.assign({
    max: 10000,
    maxAge: 1000 * 60 * 15
  }, options));
};
