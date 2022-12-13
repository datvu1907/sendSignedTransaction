require("dotenv").config();
const ethers = require("ethers");
const web3 = require("./web3");

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "getAdminAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUSDCAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUSDTAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_wallet", type: "address" }],
    name: "setAdminAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "setUSDCAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "setUSDTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
    ],
    name: "withdrawUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
    ],
    name: "withdrawUSDT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contractAddress = "0x0F0F225AD15BED298524E48266aF24d80b314906";

const transferUSDT = async () => {
  const publicKey = "0xa4adB90b738aA7205e5d79e8CF116F70e1087e3E";
  const privateKey = process.env.PRIVATE_KEY;
  const depositAddress = "0x26fF4E41c40a6f93eAe15580ACdE69c4573E74FB";
  const exchangeContract = new web3.eth.Contract(abi, contractAddress);
  const tx = {
    from: publicKey,
    to: contractAddress,
    gas: 5000000,
    data: exchangeContract.methods
      .withdrawUSDT(
        ethers.BigNumber.from("10000000000000000000"),
        depositAddress
      )
      .encodeABI(),
  };
  const signature = await web3.eth.accounts.signTransaction(tx, privateKey);
  web3.eth
    .sendSignedTransaction(signature.rawTransaction)
    .on("receipt", (receipt) => {
      console.log(receipt);
    });
};
transferUSDT();
