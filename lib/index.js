const util = require('reshape-plugin-util')
const gen = require('reshape-code-gen')
const parse = require('reshape-parser')

module.exports = (locals) => {
  return function (tree, opts) {
    return util.modifyNodes(tree, (node) => node.type === 'code', (node) => {
      const newNode = parse(gen.call({ runtime: opts.runtime }, node, opts)(locals))
      newNode.location = node.location
      return newNode
    })
  }
}
