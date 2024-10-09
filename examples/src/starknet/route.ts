import { Router as FibrousRouter } from "fibrous-router-sdk";
import { parseUnits } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
async function main() {
    // Create a new router instance
    const fibrous = new FibrousRouter();

    // Build route options
    const tokens = await fibrous.supportedTokens();
    try {
        const tokenInAddress = tokens["eth"].address;
        const tokenOutAddress = tokens["usdc"].address;
        const tokenInDecimals = tokens["eth"].decimals;
        const inputAmount = BigNumber.from(parseUnits("0.02", 18));
        const reverse = false;
        // Converting 1 ETH to USDC
        const route = await fibrous.getBestRoute(
            inputAmount,
            tokenInAddress,
            tokenOutAddress,
            "starknet"
            {
                reverse,
            },
        );
        console.log("route", route);
    } catch (error) {
        console.error(error);
    }
}

main();
