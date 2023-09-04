
<p align="center">
  <a href="https://fibrous.finance">
    <img src="./docs/assets/logo.png" width="400px" >
  </a>
</p>

# Fibrous Finance SDK (v0.3b)

## Installation

```bash
# NPM
npm install fibrous-router-sdk

# Yarn
yarn add fibrous-router-sdk

# PNPM
pnpm add fibrous-router-sdk
```

## Usage
Fetching Tokens
```javascript
import { Router as FibrousRouter } from "fibrous-router-sdk";

const router = new FibrousRouter();
const suportedTokens = await router.supportedTokens(); // returns array as token type (src/types/token.ts)

```
Fetching route
```javascript
import { Router as FibrousRouter } from "fibrous-router-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";

const router = new FibrousRouter();

const tokenInAddress = tokens["eth"].address;
const tokenOutAddress = tokens["usdc"].address;
const tokenInDecimals = tokens["eth"].decimals;
const inputAmount = BigNumber.from(parseUnits("1", tokenInDecimals));

const route = await fibrous.getBestRoute(
            inputAmount, // amount 
            tokenInAddress, // token input
            tokenOutAddress, // token output
        );
// returns route type (src/types/route.ts)

```

Build transaction
```javascript
import { Router as FibrousRouter } from "fibrous-router-sdk";
import { connect, disconnect } from '@argent/get-starknet'
import { Account, Provider } from "starknet";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";

const fibrous = new FibrousRouter();

const tokenInAddress = tokens["eth"].address;
const tokenOutAddress = tokens["usdc"].address;
const tokenInDecimals = tokens["eth"].decimals;
const inputAmount = BigNumber.from(parseUnits("1", tokenInDecimals));

// Build route options
const tokens = await fibrous.supportedTokens();
// Get a route using the getBestRoute method
const route = await fibrous.getBestRoute(
            inputAmount, // amount 
            tokenInAddress, // token input
            tokenOutAddress, // token output
        );
if (bestRoute.success === false) {
    console.error(bestRoute.errorMessage);
    return;
}



// Usege on your website

const starknet = await connect({ showList: false }) 

await starknet.enable()

if (starknet.isConnected) {

  // Call the buildTransaction method in order to build the transaction
  const slippage = 0.5;
  const receiverAddress = starknet.selectedAddress;

  const approveToken = {
      contractAddress: tokenInAddress,
      entrypoint: "approve",
      calldata: [fibrous.ROUTER_ADDRESS, amount.toString(), '0'],
  };

  const tx = fibrous.buildTransaction(bestRoute, slippage, receiverAddress);

  await starknet.account.execute([approveToken,tx]);
}


// Usage on backend

const provider = new Provider();
const privateKey0 = "YOUR_PRIVATE_KEY";
const accountAddress0 = "YOUR_WALLET_ADDRESS";
const account = new Account(provider, accountAddress0, privateKey0);

// Call the buildTransaction method in order to build the transaction
const slippage = 0.5;
const tx = fibrous.buildTransaction(bestRoute, slippage, accountAddress0);

 const approveToken = {
      contractAddress: tokenInAddress,
      entrypoint: "approve",
      calldata: [fibrous.ROUTER_ADDRESS, amount.toString(), '0'],
  };

await account.execute([approveToken, tx])

```
Check out the [examples](./examples) folder for more detailed examples.

## Contributing

We welcome contributions from the community. Please review our [contributing guidelines](./docs/CONTRIBUTING.md) to get started.