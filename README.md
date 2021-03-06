## CLI tool for NEARSwap 

### Prerequisites:

* nodejs >= 12.17 (v14 preferred)
* near-cli
* bash
 **NOTE**: `neraswap` has issues with `zsh` shell, because `zsh` parses `{ .. }` (curly braces) for command parameters. Please use `bash`. 

To install prerequisites:

check your node version

```
> node -v
v14.x.y
```

If your version is < v12.17, you must install nodejs from [nodejs.org](nodejs.org) (windows/linux), 
or use [nvm](https://github.com/nvm-sh/nvm) (linux) to install node stable

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

`> nearswap pool_info { token:gold.nearswap.testnet }`

```
View call: beta-1.nearswap.testnet.pool_info({"token":"gold.nearswap.testnet"})
{
  ynear: "12998486894407298000000000",
  reserve: "221800000030020300000000",
  total_shares: "1000000000022852100000"
}
```

### Use Case, Alice becomes a Liquidity Provider

Alice, wants to create a new pool to provide liquidity for the gold NEP21-token.

She lists the pools to check if that pool already exists:

`> nearswap list_pools`

```
View call: beta-1.nearswap.testnet.list_pools()
[ 'gold.nearswap.testnet', 'usd.nearswap.testnet', [length]: 2 ]
```


The pool does not exists, she creates the pool:

`> nearswap create_pool { token:gold.nearswap.testnet }`


She lists the pools to check if the pool was created:

`> nearswap list_pools`

```
View call: beta-1.nearswap.testnet.list_pools()
[ 'gold.nearswap.testnet', 'usd.nearswap.testnet', 'gold.nearswap.testnet', [length]: 3 ]
```

Now she needs to add liquidity to the pool


First, she needs to allow the CLP-contract to grab the gold tokens from her NEP21-account 

`> nearswap inc_allowance gold.nearswap.testnet 10_000` 


Then, she can add the liquidity: NEAR+gold to the new pool, she sends 100N and the CLP uses the allowance

`> nearswap add_liquidity { token:gold.nearswap.testnet, max_tokens:10, min_shares:100 } --amount 100N` 


Now she checks the pool to see the results

`> nearswap info gold` 


And she can check how many shares she owns in that pool

`> nearswap shares gold.nearswap.testnet` 


### Use Case, Bob wants to add liquidity to an existing pool

Bob lists the pools

`> nearswap list_pools`


Bob checks the actual price of the tokem

`> nearswap price gold.nearswap.testnet` 


and checks the status of the pool

`> nearswap pool_info { token:gold.nearswap.testnet }` 

He doesn't have gold tokens, but since this is a demo, he can mint gold for himself

`> nearswap nep21 mint gold`

Then, he can allow the CLP-contract to grab his new gold tokens from his NEP21-account 

`> nearswap inc_allowance gold 1000` 

then he adds liquidity

`> nearswap add_liquidity { token:gold.nearswap.testnet, max_tokens:1000, min_shares:50 } --amount 50N` 


and he can check his shares now

`> nearswap shares gold.nearswap.testnet` 



### Use Case, Alice wants to redeem her LP shares to withdraw liquidiy

She can check the actual price of the tokem

`> nearswap price gold.nearswap.testnet` 


and check how many shares she own

`> nearswap shares gold.nearswap.testnet` 


then she can redeem her LP shares

`> nearswap withdraw_liquidity { token:gold.nearswap.testnet, shares: 0.05, min_ynear:10N, min_tokens:0.9 }` 


and check the pool after

`> nearswap pool_info { token:gold.nearswap.testnet }` 
