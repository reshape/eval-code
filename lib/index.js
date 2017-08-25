const util = require('reshape-plugin-util')
const gen = require('reshape-code-gen')
const parse = require('reshape-parser')

module.exports = function reshapeEvalCode (_locals = {}) {
  return function evalCodePlugin (tree, opts) {
    const locals = Object.assign({}, opts.locals || {}, _locals)
    return util.modifyNodes(tree, (node) => {
      return node.type === 'code' || node.type === 'tag'
    }, (node) => {
      if (node.type === 'tag') {
        if (!node.attrs) return node
        for (let k in node.attrs) {
          node.attrs[k] = node.attrs[k].map((n) => {
            if (n.type !== 'code') return n
            return evalNode(n, locals, opts)[0]
          })
        }
        return node
      }
      if (node.type === 'code') return evalNode(node, locals, opts)
    })
  }
}

function evalNode (node, locals, opts) {
  let newNode = parse(gen.call({ runtime: opts.runtime }, node, opts)(locals))
  if (newNode.length === 0) { newNode = [{ type: 'text', content: '' }] }
  if (node.location) { newNode[0].location = node.location }
  return newNode
}
