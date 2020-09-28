#!/bin/node
import { CommandLineArgs, ShowHelpPage } from "./util/CommandLineArgs.js";
import { nickname, ContractAPI } from "./ContractAPI.js";
import { options } from "./CLIOptions.js";
import * as color from "./util/color.js";
import { spawnNearCli } from "./util/SpawnNearCli.js"

const API = new ContractAPI();
const args = new CommandLineArgs(options);

//command is the 1st positional argument
let command = args.getCommand();

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
if (command=="inc_allowance") {

    const a = args

    //auto add 0.1N refunable for nep21 storage requirements
    if (!options.amount.value) options.amount.value=0.1
    //a.requireOptionWithAmount(options.amount,"N")

    let nep21_contract = a.consumeString("token")
    let nep21_amount = a.consumeAmount("token_amount","Y")

    a.noMoreArgs() // no more positional args should remain

    a.contractName = nep21_contract
    
    let fnJSONparams = {escrow_account_id:options.contractName.value, amount: nep21_amount}

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
API[command](args);
//# sourceMappingURL=tom.js.map