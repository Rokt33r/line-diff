var DiffMatchPatch = require('./diff_match_patch_uncompressed')

function InvalidPatchError (message) {
  this.name = 'InvalidPatchError'
  this.message = message
}
InvalidPatchError.prototype = new Error()

// Polyfill - isArray
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}

module.exports = function (options) {
  var gDiff = new DiffMatchPatch(options)

  function makePatch (text1, text2) {
    var a = gDiff.diff_linesToChars_(text1, text2)

    var lineText1 = a.chars1
    var lineText2 = a.chars2
    var lineArray = a.lineArray

    var diffs = gDiff.diff_main(lineText1, lineText2, false)

    gDiff.diff_charsToLines_(diffs, lineArray)
    return gDiff.patch_toText(gDiff.patch_make(diffs))
  }

  function applyOnce (text, patch) {
    var result = gDiff.patch_apply(gDiff.patch_fromText(patch), text)

    if (!result[1]) {
      throw new InvalidPatchError()
    }
    return result[0]
  }

  function applyPatch (text, patch) {
    if (typeof text !== 'string') {
      throw new InvalidPatchError('Target text is not a String.')
    }

    if (Array.isArray(patch)) {
      return patch.reduce(function (result, aPatch, index) {
        try {
          if (typeof aPatch !== 'string') throw new InvalidPatchError('Patch at ' + index + ' is not a String')

          result = applyOnce(result, aPatch)
        } catch (e) {
          throw new InvalidPatchError('Failed to apply at ' + index + ' patch')
        }
        return result
      }, text)
    }

    if (typeof patch === 'string') {
      return applyOnce(text, patch)
    }

    throw new InvalidPatchError('Patch is not a String|String[]')
  }

  return {
    makePatch: makePatch,
    applyPatch: applyPatch
  }
}
