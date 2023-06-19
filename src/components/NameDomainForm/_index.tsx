// import { memo, useState } from "react";
// import { makeNameDomainContract } from "../../utils/nameDomain";
// import { BaseProvider } from '@metamask/providers';
// import Web3 from "web3";
// import detectEthereumProvider from '@metamask/detect-provider';

// declare global {
//   interface Window {
//     ethereum: BaseProvider;
//   }
// }

// // Web3オブジェクトの型
// type Web3Type = Web3 | null;

// // アカウントの型
// type AccountType = string | null;

// type NameDomainFormProp = {
//   address: string;
//   twitterId: string;
//   setStep: React.Dispatch<React.SetStateAction<number>>;
// };

// export const NameDomainForm: React.FC<NameDomainFormProp> = memo(
//   ({ address, twitterId, setStep }) => {
//     const [web3, setWeb3] = useState<Web3Type>(null);
//     const [account, setAccount] = useState<AccountType>(null);

//     const domain = `${twitterId.slice(1)}.ppw`;
//     const handleClick = async () => {
//       const { contract, web3 } = makeNameDomainContract();
//       const fee = await contract.methods.price(domain).call();
//       console.log(fee);
//       const myAddress = await web3.eth.getAccounts();
//       console.log(myAddress);
//       //TODO: polygon gas station
//       await contract.methods.register(domain).send({
//         from: myAddress[0],
//         value: fee,
//         maxPriorityFeePerGas: web3.utils.toWei("3", "gwei"),
//         maxFeePerGas: web3.utils.toWei("3", "gwei"),
//       });
//       setStep(3);
//       return "resolved";
//     };

// // メタマスクと接続する関数
// const connectMetamask = async () => {
//   // メタマスクがインストールされているかどうかを検出
//   const provider = await detectEthereumProvider({ mustBeMetaMask: true });
//   if (provider && window.ethereum) {
//     // Web3オブジェクトを作成
//     const web3 = new Web3(Web3.givenProvider);
//     // アカウントのアクセス許可を要求
//     const accounts = await web3.eth.requestAccounts();
//     // ステートにセット
//     setWeb3(web3);
//     setAccount(accounts[0]);
//   } else {
//     alert('メタマスクがインストールされていません');
//   }
// };

// // 送金する関数
// const sendTransaction = async () => {
//   if (web3 && account) {
//     // 送金先のアドレス（適当に変えてください）
//     const toAddress = address;
//     // 送金額（wei単位）
//     const value = web3.utils.toWei('0.01', 'ether');
//     // トランザクションのパラメータ
//     const txParams = {
//       from: account,
//       to: toAddress,
//       value: value,
//       gas: 21000,
//       maxPriorityFeePerGas: undefined,
//       maxFeePerGas: undefined,
//     };
//     // トランザクションの作成
//     const txHash = await web3.eth.sendTransaction(txParams);
//     // トランザクションハッシュを表示
//     alert(`トランザクションハッシュ: ${txHash}`);
//   } else {
//     alert('メタマスクに接続してください');
//   }
// };

// const sendChip = async() => {
//   await connectMetamask();
//   await sendTransaction();
//   return 'resolved'
// }

//     return (
//       <div className="flex flex-col justify-center gap-y-6 items-center">
//         <div className="flex flex-col items-center p-4 border-2 border-success rounded-md">
//           <div className="text-xl">
//             address: <span className="text-success">{address}</span>
//           </div>
//           <div>
//             <a
//               href={`https://mumbai.polygonscan.com/address/${address}`}
//               className="link"
//             >
//               Visit Polygon Scan
//             </a>
//           </div>
//         </div>
//         <button className="btn btn-secondary" onClick={() => sendChip()}>
//           Connect Wallet And Send 0.01MATIC Chip
//         </button>
//         <div className="flex justify-center gap-x-6 items-center">
//           <div className="text-accent text-xl underline">{domain}</div>
//           <button className="btn btn-primary" onClick={() => handleClick()}>
//             Register Domain
//           </button>
//         </div>
//       </div>
//     );
//   }
// );
