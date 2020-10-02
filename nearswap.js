#!/bin/node
import { CommandLineArgs, ShowHelpPage } from "./util/CommandLineArgs.js";
import { nickname, ContractAPI } from "./ContractAPI.js";
import { options } from "./CLIOptions.js";
import * as color from "./util/color.js";
import { spawnNearCli } from "./util/SpawnNearCli.js"

const API = new ContractAPI();
const a = new CommandLineArgs(options);

//command is the 1st positional argument
let command = a.getCommand();

//---------------------
function near(cv /*:"call"|"view"*/, command/*:string*/, fnJSONparams) {
    const nearCliArgs = [
        cv,
        options.contractName.value,
        command,
        fnJSONparams,
    ]
    a.addOptionsTo(nearCliArgs); //add any other --options found the command line
    spawnNearCli(nearCliArgs);
}
//---------------------
function nearView(command, fnJSONparams) {
    return near("view", command, fnJSONparams)
}
//---------------------
function nearCall(command, fnJSONparams) {
    return near("call", command, fnJSONparams)
}

//---------------------
// CLI-ONLY COMMANDS //
//---------------------
//Show info if requested 
if (options.info.value) {
    console.log(`default ContractName: ${color.yellow}${options.contractName.value}${color.normal}`);
    console.log(`default user AccountId: ${color.yellow}${options.accountId.value}${color.normal}`);
    process.exit(0);
}

//TODO configure
// if (command=="configure") {
//     args.requireOptionString(options.accountId,"default account Id")
//     process.exit(0);
// }

//---------------------
// external NEP21 COMMANDS //
//---------------------
if (command == "inc_allowance") {

    //auto add 0.1N refunable for nep21 storage requirements
    if (!options.amount.value) options.amount.value = 0.1
    //a.requireOptionWithAmount(options.amount,"N")

    let nep21_contract = a.consumeString("token")
    let nep21_amount = a.consumeAmount("token_amount", "Y")

    a.noMoreArgs() // no more positional args should remain

    a.contractName = nep21_contract

    let fnJSONparams = { escrow_account_id: options.contractName.value, amount: nep21_amount }

    const nearCliArgs = [
        "call",
        nep21_contract,
        "inc_allowance",
        fnJSONparams,
    ]

    a.addOptionsTo(nearCliArgs); //add any other --options found the command line

    spawnNearCli(nearCliArgs);

    process.exit(0);
}


//---------------------
//info [token]*
//---------------------
if (command == "info") {

    if (a.positional.length == 0) {
        API.list_pools(a)
    }
    else {
        while (a.positional.length) {
            let pool = a.consumeString()
            nearView("pool_info", { token: pool + '.nearswap.testnet' })
        }
    }
    process.exit(0);
}

if (command == "hm") {

    let str = a.consumeString("amount")
    console.log(a.convertAmount(str + "Y", "N", "amount"))
    process.exit(0);
}

//nep21 balance
// >nearswap nep21 balance gold
if (command == "nep21") {
    let subcommand = a.consumeString("sub-command")
    
    if (subcommand == "balance") {

        let tokenOwner = options.contractName.value
        if (a.optionalString("my")) tokenOwner = options.accountId.value
        
        while (a.positional.length) {
            let token = a.consumeString()+ '.nearswap.testnet'
            options.contractName.value = token
            nearView("get_balance", { owner_id: tokenOwner })
        }
    }

    else if (subcommand == "mint") {
        let token = a.consumeString()+ '.nearswap.testnet'
        options.contractName.value = token
        nearCall("mint_1e3", { })
    }

    //nearswap nep21 transfer 50000 gold to lucio.testnet
    else if (subcommand == "transfer") {

        let tokAmount = a.consumeAmount("token amount","Y")
        
        let token = a.consumeString()+ '.nearswap.testnet'

        a.optionalString("to")

        let toAcc = a.consumeString("to")
        if (toAcc=="contract") toAcc=options.contractName.value

        options.contractName.value = token
        nearCall("transfer", { new_owner_id:toAcc, amount:tokAmount })

    }

    else {
        console.log("nep21 UNK subcommand "+color.red+subcommand+color.normal)
        process.exit(1);    
    }

    process.exit(0);
}

//---------------------
// CONTRACT COMMANDS //
//---------------------
//check the command is in the API
if (command && typeof API[command] != "function") {
    color.logErr("unknown command " + color.yellow + command + color.normal);
    console.log(`${nickname} --help to see a list of commands`);
    process.exit(1);
}
//Show help if requested or if no command
if (options.help.value || !command) {
    ShowHelpPage(command, API, options);
    process.exit(0);
}
//call the contract API -> near-cli
API[command](a);
//# sourceMappingURL=tom.js.map