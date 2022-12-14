
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./chewy-lib.cjs.production.min.js')
} else {
  module.exports = require('./chewy-lib.cjs.development.js')
}
