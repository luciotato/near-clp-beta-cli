## CLI tool for NEARSwap 

### Prerequisites:

* nodejs >= 12.17
* near-cli

To install prerequisites:

check your node version

```
> node -v
v12.17.0
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

Alice, wants to create a new pool to provide liquidity for the usd24 NEP21-token.

She lists the pools to check if that pool already exists:

`> nearswap list_pools`

```
View call: beta-1.nearswap.testnet.list_pools()
[ 'gold.nearswap.testnet', 'usd.nearswap.testnet', [length]: 2 ]
```


The pool does not exists, she creates the pool:

`> nearswap create_pool { token:usd24.nearswap.testnet }`


She lists the pools to check if the pool was created:

`> nearswap list_pools`

```
View call: beta-1.nearswap.testnet.list_pools()
[ 'gold.nearswap.testnet', 'usd.nearswap.testnet', 'usd24.nearswap.testnet', [length]: 3 ]
```

Now she needs to add liquidity to the pool


First, she needs to allow the CLP-contract to grab the usd24 tokens from her NEP21-account 

`> nearswap inc_allowance usd24.nearswap.testnet 10` 


Then, she can add the liquidity: NEAR+usd24 to the new pool, she sends 100N and the CLP uses the allowance

`> nearswap add_liquidity { token:usd24.nearswap.testnet, max_tokens:10, min_shares:100 } --amount 100N` 


Now she checks the pool to see the results

`> nearswap pool_info { token:usd24.nearswap.testnet }` 


And she can check how many shares she owns in that pool

`> nearswap shares usd24.nearswap.testnet` 


### Use Case, Bob wants to add liquidity to an existing pool

Bob lists the pools

`> nearswap list_pools`


Bob checks the actual price of the tokem

`> nearswap price usd24.nearswap.testnet` 


and checks the status of the pool

`> nearswap pool_info { token:usd24.nearswap.testnet }` 


First, he needs to allow the CLP-contract to grab the usd24 tokens from his NEP21-account 

`> nearswap inc_allowance usd24.nearswap.testnet 5` 

then he adds liquidity

`> nearswap add_liquidity { token:usd24.nearswap.testnet, max_tokens:5, min_shares:50 } --amount 50N` 


and he can check his shares now

`> nearswap shares usd24.nearswap.testnet` 



### Use Case, Alice wants to redeem her LP shares to withdraw liquidiy

She can check the actual price of the tokem

`> nearswap price usd24.nearswap.testnet` 


and check how many shares she own

`> nearswap shares usd24.nearswap.testnet` 


then she can redeem her LP shares

`> nearswap withdraw_liquidity { token:usd24.nearswap.testnet, shares: 0.05, min_ynear:10N, min_tokens:0.9 }` 


and check the pool after

`> nearswap pool_info { token:usd24.nearswap.testnet }` 
