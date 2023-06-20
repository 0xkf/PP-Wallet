// import { ChangeEvent, useState } from "react";
// import { makeAccountFactoryContract } from "../../utils/accountFactory";
// import { setTokenSourceMapRange } from "typescript";

// type UseAddressReqFormParams = {
//   address: string;
//   setAddress: React.Dispatch<React.SetStateAction<string>>;
//   setTwitterId: React.Dispatch<React.SetStateAction<string>>;
//   setStep: React.Dispatch<React.SetStateAction<number>>;
// }

// export const useAddressReqForm = ({address, setAddress, setTwitterId, setStep}: UseAddressReqFormParams) => {

//     const [inputValue, setInputValue] = useState<string>('');
//     console.log(inputValue);
    
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     console.log(e.target.value);
    
//     setInputValue(e.target.value)
//   }

//   const handleClick = async() => {
//     const {contract} = makeAccountFactoryContract();
//     console.log(inputValue);
//     const address = await contract.methods.getAddress('0xa4E1040705Cb9434D97A295079fe0442eE571456', inputValue, 'twitter').call();
//     console.log(inputValue);
//     setTwitterId(inputValue)
//     console.log(address);
//     setAddress(address);
//     setStep(2);
//     return 'resolved';
//   }

//   return {inputValue, setInputValue, address, setAddress, handleClick, handleChange}
// }

import { ChangeEvent, useState } from "react";
import { makeAccountFactoryContract } from "../../utils/accountFactory";
import { setTokenSourceMapRange } from "typescript";

type UseAddressReqFormParams = {
  addresses: string[]; // Changed from address
  setAddresses: React.Dispatch<React.SetStateAction<string[]>>; // Changed from setAddress
  setTwitterId: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const useAddressReqForm = ({addresses, setAddresses, setTwitterId, setStep}: UseAddressReqFormParams) => {

    const [inputValue, setInputValue] = useState<string>('');

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value)
  // }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }
  

  const handleClick = async() => {
    const {contract} = makeAccountFactoryContract();

    // Split the input value by comma or newline and trim whitespace
    const twitterIds = inputValue.split(/,|\n/).map(id => id.trim());

    // Get addresses for each twitterId
    const addressPromises = twitterIds.map(twitterId =>
      contract.methods.getAddress('0xa4E1040705Cb9434D97A295079fe0442eE571456', twitterId, 'twitter').call()
    );
    
    // Await all promises and set the results
    const resolvedAddresses = await Promise.all(addressPromises);
    
    setAddresses(resolvedAddresses);
    setTwitterId(twitterIds.join(', '));
    setStep(2);
  }

  return {inputValue, setInputValue, addresses, setAddresses, handleClick, handleChange}
}
