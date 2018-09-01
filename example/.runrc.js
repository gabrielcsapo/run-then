module.exports = {
  default: [{
    when: /^foo bar/,
    do: async function() {
      console.log('hi');
    }
  }],
  verbose: [{
    when: /(.+?)/,
    noOutput: true,
    do: async function(data) {
      console.log(`${Date()} ${data.trim()}`);
    }
  }],
  finished: [{
    onExit: true,
    do: async function(data) {
      console.log('done!');
    }
  }]
}
