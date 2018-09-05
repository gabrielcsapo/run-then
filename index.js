const path = require('path')
const os = require('os')
const debug = require('debug')

module.exports.getRules = async function (rules = ['default']) {
  const possiblePaths = [
    path.resolve(os.homedir(), '.runrc'),
    path.resolve(os.homedir(), '.runrc.js'),
    path.resolve(process.cwd(), '.runrc'),
    path.resolve(process.cwd(), '.runrc.js')
  ]

  try {
    let allRules = {}

    for (const possiblePath of possiblePaths) {
      try {
        allRules = Object.assign(allRules, require(possiblePath))
      } catch (ex) {
        if (ex.message.indexOf('Cannot find module') === -1) {
          // rethrow so that user knows about a syntax error that could be happening
          throw ex
        } else {
          debug(`no config found ${possiblePath}`)
        }
      }
    }

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
