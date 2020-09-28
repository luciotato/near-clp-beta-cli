## CLI tool for NEARSwap 

### Prerequisites:

* nodejs stable (v14)
* near-cli

To install prerequisites:

check your node version

`> node -v`

`v14.x.y`

If your version is <14, you can install nodejs from [nodejs.org], or use [nvm](https://github.com/nvm-sh/nvm) to install node stable

`> nvm install stable`

You can use npm to install near-cli

`> npm install -g near-cli`

### Installing this cli:

1. Clone this repo

`> git clone https://github.com/luciotato/near-clp-beta-cli`

2. npm link

```
> cd near-clp-beta-cli
> npm link
> cd ..
```

### Configuring

You need to edit `CLIOptions.js` to add your own near account

`> code near-clp-beta-cli/CLIOptions.js`

```
//CLIOptions.js

    accountId: {
        shortName: "acc",
        valueType: "string",
 -----> value: "lucio.testnet",  <----- edit this value
        helpText: `user accountId, sets signer`
    },
```

### Usage example

`> nearswap list_pools`

```
View call: beta-1.nearswap.testnet.list_pools()
[ 'gold.nearswap.testnet', 'usd.nearswap.testnet', [length]: 2 ]
```

`> nearswap pool_info { "token": "gold.nearswap.testnet" }`

```
View call: beta-1.nearswap.testnet.pool_info({"token":"gold.nearswap.testnet"})
{
  ynear: "12998486894407298000000000",
  reserve: "221800000030020300000000",
  total_shares: "1000000000022852100000"
}
```
