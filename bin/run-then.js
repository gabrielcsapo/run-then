#!/usr/bin/env node

const ruleFlags = process.argv.slice(2);

(async function () {
  const { getRules, checkRules } = require('../index')

  try {
    const rules = await getRules(ruleFlags)
    
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', async function (data) {
      await checkRules(data, rules, false)
    })

    process.on('exit', async function () {
      await checkRules('', rules, true)
    })
  } catch(ex) {
    console.log('failed to run-then with error', ex);
  }
}())
