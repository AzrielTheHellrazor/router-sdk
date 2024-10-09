import { BigNumber } from "@ethersproject/bignumber";
import { Router as FibrousRouter } from "fibrous-router-sdk";
import { parseUnits } from "ethers";
import { Call } from "starknet";

import { account } from "./account";

async function main() {
    // Create a new router instance
    const fibrous = new FibrousRouter();

    // Build route options
    const tokens = await fibrous.supportedTokens("starknet");

    const tokenInAddress = tokens["usdt"].address;
    const tokenOutAddress = tokens["usdc"].address;
    const tokenInDecimals = tokens["usdt"].decimals;
    const inputAmount = BigNumber.from(parseUnits("5", tokenInDecimals));

    // Call the buildTransaction method in order to build the transaction
    // slippage: The maximum acceptable slippage of the buyAmount amount.
    // slippage formula = slippage * 100
    // value 0.005 is %0.5, 0.05 is 5%, 0.01 is %1, 0.001 is %0.1 ...
    const slippage = 0.005;
    const destination = "account_address";
    const swapCall = await fibrous.buildTransaction(
        inputAmount,
        tokenInAddress,
        tokenOutAddress,
        slippage,
        destination,
        "starknet",
    );
    const public_key = "public_key";
    const privateKey = "private_key";

    // https://www.starknetjs.com/docs/guides/connect_account
    // If this account is based on a Cairo v2 contract (for example OpenZeppelin account 0.7.0 or later), do not forget to add the parameter "1" after the privateKey parameter
    const RPC_URL = "RPC_URL";
    const account0 = account(privateKey, public_key, "1", RPC_URL);
    const approveCall: Call = await fibrous.buildApproveStarknet(
        inputAmount,
        tokenInAddress,
    );
    const resp = await account0.execute([approveCall, swapCall]);
    console.log(`https://starkscan.co/tx/${resp.transaction_hash}`);
}

main();
