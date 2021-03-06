export const options = {
    contractName: {
        shortName: "c",
        valueType: "string",
        value: "beta-1.nearswap.testnet",
        helpText: `sets the contract account ID`
    },
    accountId: {
        shortName: "acc",
        valueType: "string",
        value: "lucio.testnet",
        helpText: `user accountId, sets signer`
    },
    masterAccount: {
        shortName: "ma",
        valueType: "string",
        value: "",
        helpText: `master account`
    },
    help: {
        shortName: "h",
        value: false,
    },
    info: {
        shortName: "i",
        value: false,
        helpText: 'show configured contract account, default user accountId',
    },
    verbose: {
        shortName: "v",
        helpText: 'Prints out verbose output',
        name: "verbose",
    },
    amount: {
        shortName: "am",
        valueType: "NEAR",
        value: "",
        helpText: `attach NEAR tokens to this call. Example: --amount 100N`
    },
    networkId: {
        shortName: "net",
        valueType: "string",
        value: "",
        helpText: 'NEAR network ID (default is NODE_ENV)',
    },
};
//# sourceMappingURL=CLIOptions.js.map