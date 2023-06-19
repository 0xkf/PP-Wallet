import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils/types";
import abi from "../abi/IDomains.json";

export const makeNameDomainContract = () => {
  const contractAddress = "0x9B45eaFd7FC6207c1cCBaaE3b75EB616988bEAa0";
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const providerUrl = process.env.REACT_APP_MUMBAI_PROVIDER_URL;

  const hdWalletProvider = new HDWalletProvider({
    privateKeys: [privateKey as string],
    providerOrUrl: providerUrl,
  });

  const web3 = new Web3(hdWalletProvider as provider);
  const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);
  return { contract, web3 };
};


