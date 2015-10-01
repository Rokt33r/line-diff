var lineDiff = require('./')()
var expect = require('chai').expect

describe('line diff', function () {
  var text1 = 'I joined Evernote as CEO two months ago because I saw the rare opportunity to help transform a product I rely on into a world class business.\nSince starting, I’ve gotten to know the amazing people here and have met many of our loyal users.\nThis team has achieved three incredible feats: they’ve created one of the most important productivity tools in history, established one of the strongest personal success brands, and built a real revenue-driven business.\nMy goal is to dramatically increase the impact of this solid foundation.'

  var text2 = 'Yolo joined Evernote as CEO two months ago because Yolo saw the rare opportunity to help transform a product Yolo rely on into a world class business.\nSince starting, Yolo’ve gotten to know the amazing people here and have met many of our loyal users.\n This team has achieved three incredible feats: they’ve created one of the most important productivity tools in history, established one of the strongest personal success brands, and built a real revenue-driven business.\nMy goal is to dramatically increase the impact of this solid foundation.'

  var text3 = "Yolo joined Evernote as CEO two months ago because Yolo saw the rare opportunity to help transform a product Yolo rely on into a world class business.\nSince starting, Yolo’ve gotten to know the amazing people here and have met many of Yolo's loyal users.\n This team has achieved three incredible feats: they’ve created one of the most important productivity tools in history, established one of the strongest personal success brands, and built a real revenue-driven business.\nMy goal is to dramatically increase the impact of this solid foundation."

  it('should make a patch', function () {
    var patch = lineDiff.makePatch(text1, text2)

    var result = lineDiff.applyPatch(text1, patch)

    expect(result).to.equal(text2)
  })

  it('should take multiple patch', function () {
    var patch1 = lineDiff.makePatch(text1, text2)
    var patch2 = lineDiff.makePatch(text2, text3)

    var result = lineDiff.applyPatch(text1, [patch1, patch2])

    expect(result).to.equal(text3)
  })
})
