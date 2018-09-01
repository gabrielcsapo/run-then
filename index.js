const path = require('path')
const os = require('os')
const debug = require('debug')

module.exports.getRules = async function (rules = ['default']) {
  try {
    let localRules = {}
    let globalRules = {}

    try {
      localRules = require(path.resolve(process.cwd(), '.runrc'))
    } catch (ex) {
      debug('no local config found')
    }

    try {
      globalRules = require(path.resolve(os.homedir(), '.runrc'))
    } catch (ex) {
      debug('no global config found')
    }

    const allRules = Object.assign(globalRules, localRules)

    return rules.map((rule) => {
      if (allRules[rule]) {
        return allRules[rule]
      } else {
        throw new Error(`.runrc.js does not have the rule "${rule}" defined`)
      }
    }).reduce((a, b) => a.concat(b), [])
  } catch (ex) {
    throw new Error('.runrc.js file not found or improperly formed')
  }
}

module.exports.checkRules = async function (data, rules, hasExited) {
  let didOutput = false

  rules.forEach(async (rule) => {
    if ((rule.when && rule.when.exec(data)) || (rule.onExit && hasExited)) {
      if (rule.noOutput) {
        didOutput = true
      }
      await rule.do(data)
    }
  })

  if (!didOutput) {
    process.stdout.write(data)
  }
}
