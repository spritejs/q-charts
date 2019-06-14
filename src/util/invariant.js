/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

const NODE_ENV = process.env.NODE_ENV

export const invariant = function(condition, message) {
  if (NODE_ENV !== 'production') {
    if (message === undefined) {
      throw new Error('invariant requires an error message argument')
    }
  }

  if (!condition) {
    var error
    if (message === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
      )
    } else {
      error = new Error(message)
      error.name = 'Qcharts Error'
    }

    error.framesToPop = 1 // we don't care about invariant's own frame
    throw error
  }
}
