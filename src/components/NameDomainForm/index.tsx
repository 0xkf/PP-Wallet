import { memo, useState } from "react";
import { makeNameDomainContract } from "../../utils/nameDomain";
import { BaseProvider } from '@metamask/providers';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';



declare global {
  interface Window {
    ethereum: BaseProvider;
  }
}

// Web3オブジェクトの型
type Web3Type = Web3 | null;

// アカウントの型
type AccountType = string | null;

type NameDomainFormProp = {
  address: string;
  twitterId: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const NameDomainForm: React.FC<NameDomainFormProp> = memo(
  ({ address, twitterId, setStep }) => {
    const [web3, setWeb3] = useState<Web3Type>(null);
    const [account, setAccount] = useState<AccountType>(null);

    const domain = `${twitterId.slice(1)}.ppw`;

    const handleClick = async () => {
        try {
          const { contract, web3 } = makeNameDomainContract();
          const fee = await contract.methods.price(domain).call();
          console.log(fee);
          const myAddress = await web3.eth.getAccounts();
          console.log(myAddress);
          //TODO: polygon gas station
          await contract.methods.register(domain).send({
            from: myAddress[0],
            value: fee,
            maxPriorityFeePerGas: web3.utils.toWei("3", "gwei"),
            maxFeePerGas: web3.utils.toWei("3", "gwei"),
          });
          setStep(3);
          return "resolved";
        } catch (error) {
          console.error("Error during domain registration:", error);
          return "rejected";
        }
      };

    // const connectMetamask = async () => {
    //   const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    //   if (provider && window.ethereum) {
    //     const web3 = new Web3(Web3.givenProvider);
    //     // const accounts = await web3.eth.requestAccounts();
    //     const accounts = await web3.eth.requestAccounts();
    //     setWeb3(web3);
    //     setAccount(accounts[0]);
    //   } else {
    //     alert('メタマスクがインストールされていません');
    //   }
    // };
    const connectMetamask = async () => {
        const provider = await detectEthereumProvider({ mustBeMetaMask: true });
        if (provider && window.ethereum) {
            const web3 = new Web3(Web3.givenProvider);
            const accounts = await web3.eth.requestAccounts();
            setWeb3(web3);
            setAccount(accounts[0]);
            
            // Resolve ENS name for the account
            try {
                const ensName = await web3.eth.ens.getAddress(accounts[0]);
                console.log(`ENS Name for the account: ${ensName}`);
            } catch (error) {
                console.error("Could not resolve ENS Name for the account:", error);
            }
        } else {
            alert('メタマスクがインストールされていません');
        }
    };

    const sendTransaction = async () => {
      if (web3 && account) {
        const toAddress = address;
        const value = web3.utils.toWei('0.01', 'ether');
        const txParams = {
          from: account,
          to: toAddress,
          value: value,
          gas: 21000,
          maxPriorityFeePerGas: undefined,
          maxFeePerGas: undefined,
        };
        const txHash = await web3.eth.sendTransaction(txParams);
        alert(`トランザクションハッシュ: ${txHash}`);
      } else {
        alert('メタマスクに接続してください');
      }
    };

    return (
        <div className="flex flex-col justify-center gap-y-6 items-center">
          <div className="flex flex-col items-center p-4 border-2 border-success rounded-md">
            <div className="text-xl">
              address: <span className="text-success">{address}</span>
            </div>
            <div>
              <a
                href={`https://mumbai.polygonscan.com/address/${address}`}
                className="link"
              >
                Visit Polygon Scan
              </a>
            </div>
            {/* Connected wallet address will be displayed here */}
            {account && (
              <div className="text-xl">
                Connected wallet: <span className="text-success">{account}</span>
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => connectMetamask()}>
            Connect Wallet
          </button>
          <button className="btn btn-secondary" onClick={() => sendTransaction()}>
            Send 0.01MATIC Chip
          </button>
          <div className="flex justify-center gap-x-6 items-center">
            <div className="text-accent text-xl underline">{domain}</div>
            <button className="btn btn-primary" onClick={() => handleClick()}>
              Register Domain
            </button>
          </div>
        </div>
      );
      
  }
);

