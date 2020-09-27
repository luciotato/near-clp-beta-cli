##CLI tool for NEARSwap 

###Prerequisites:

* nodejs stable (v14)
* near-cli

To install prerequisites:
You can use nvm to install node stable
`> nvm install stable`

You can use npm to install near-cli
`> npm install -g near-cli`

###Installing:

1. Clone this repo
`> git clone https://github.com/luciotato/near-clp-beta-cli`

2. npm link
`> cd near-clp-beta-cli`
`> npm link`
`> cd ..`

###Configuring

You need to edit `CLIOptions.js` to add your own near account
`> code near-clp-beta-cli/CLIOptions.js`

`
//CLIOptions.js

    accountId: {
        shortName: "acc",
        valueType: "string",
        value: "lucio.testnet",  <---- edit this value
        helpText: `user accountId, sets signer`
    },
`
