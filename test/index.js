const evalCode = require('..')
const reshape = require('reshape')
const expressions = require('reshape-expressions')
const test = require('ava')

test('basic', (t) => {
  return reshape({ plugins: [expressions(), evalCode({ foo: 'bar' })] })
    .process('<p>{{ foo }}</p>')
    .then((res) => { t.is(res.output(), '<p>bar</p>') })
})

test('loops', (t) => {
  return reshape({ plugins: [expressions(), evalCode({ items: ['one', 'two'] })] })
    .process('<each loop="item in items"><p>{{ item }}</p></each>')
    .then((res) => { t.is(res.output(), '<p>one</p><p>two</p>') })
})
