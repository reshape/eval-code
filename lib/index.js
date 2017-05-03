const util = require('reshape-plugin-util')
const gen = require('reshape-code-gen')
const parse = require('reshape-parser')

module.exports = (_locals = {}) => {
  return function (tree, opts) {
    const locals = Object.assign({}, opts.locals || {}, _locals)
    return util.modifyNodes(tree, (node) => {
      return node.type === 'code' || node.type === 'tag'
    }, (node) => {
      if (node.type === 'tag') {
        if (!node.attrs) return node
        for (let k in node.attrs) {
          node.attrs[k].map((n) => {
            if (n.type === 'code') { node.attrs[k] = evalNode(n, locals, opts) }
          })
        }
        return node
      }
      if (node.type === 'code') return evalNode(node, locals, opts)
    })
  }
}

function evalNode (node, locals, opts) {
  const newNode = parse(gen.call({ runtime: opts.runtime }, node, opts)(locals))
  if (node.location) { newNode.location = node.location }
  return newNode
}
