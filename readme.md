# line-diff

A simple line diff/patch module with [Google diff_match_patch](https://code.google.com/p/google-diff-match-patch/)

## Install

Use NPM
```
npm i -S @rokt33r/line-diff
```

## How to use

``` js
var lineDiff = require('@rokt33r/line-diff')()

var before = `line1
line2
line3`
var after = `line1
ライン2
line3`

// Make a patch
var patch = lineDiff.makePatch(before, after)

console.log(patch)
/*
  @@ -3,14 +3,13 @@
  ne1%0A
  -line2%0A
  +%E3%83%A9%E3%82%A4%E3%83%B32%0A
   line
*/

// Apply a patch
var result = lineDiff.applyPatch(before, patch)

console.log(result)
/*
  line1
  ライン2
  line3
*/
```

## Api

### `makePatch(before, after)`
Make a patch string(standard GNU diff/patch format)

### `applyPatch(before, patch|patch[])`
Apply patch to target string. This method can take multiple patch to apply.

### with google-diff-match-patch options

Put options into constructor
```
var lineDiff = require('@rokt33r/line-diff')(options)
```
