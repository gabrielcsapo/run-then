const test = require('tape')

const { checkRules } = require('../index')

test('@checkRules', (t) => {
  t.test('should not find a rule and do nothing', async (t) => {
    t.plan(0)

    await checkRules('Hello', [])

    t.end()
  })

  t.test('should find the rule and run it', async (t) => {
    t.plan(1)

    let found = false

    await checkRules('Hello', [{
      when: /Hello/,
      do: () => {
        found = true
      }
    }])

    t.equal(found, true)
    t.end()
  })

  t.test('should call rule whne isFinished is true', async (t) => {
    t.plan(1)

    let found = false

    await checkRules('Hello', [{
      onExit: true,
      do: () => {
        found = true
      }
    }], true)

    t.equal(found, true)
    t.end()
  })
})
