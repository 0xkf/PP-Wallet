// import { memo, } from "react";
// import { useAddressReqForm } from "./useAddressReqForm";

// type AddressReqFormProp = {
//   address: string;
//   setAddress: React.Dispatch<React.SetStateAction<string>>;
//   setStep: React.Dispatch<React.SetStateAction<number>>;
//   setTwitterId: React.Dispatch<React.SetStateAction<string>>;
// };

// export const AddressReqForm: React.FC<AddressReqFormProp> = memo(
//   ({ address, setAddress, setStep, setTwitterId }) => {
//     const {
//       inputValue,
//       handleClick,
//       handleChange,
//     } = useAddressReqForm({ address, setAddress, setTwitterId, setStep });

//     return (
//       <div className="flex flex-col justify-center gap-y-4 items-center">
//         <div className="flex justify-center gap-x-6 items-center">
//           <div className="flex items-center">

//           <img src="/twitter-bird-transparent.png" className="max-h-14" alt="twitter-bird"/>
//           <input
//             value={inputValue}
//             onChange={(e) => handleChange(e)}
//             type="text"
//             placeholder="@example"
//             className="input input-bordered input-primary w-full max-w-xs"
//             />
//             </div>
//           <button className="btn btn-primary" onClick={() => handleClick()}>
//             search
//           </button>
//         </div>
//       </div>
//     );
//   }
// );


// ===========================================================

// import { memo } from "react";
// import { useAddressReqForm } from "./useAddressReqForm";

// type AddressReqFormProp = {
//   addresses: string[]; // string to string array
//   setAddresses: React.Dispatch<React.SetStateAction<string[]>>; // React.Dispatch<React.SetStateAction<string>> to React.Dispatch<React.SetStateAction<string[]>>
//   setStep: React.Dispatch<React.SetStateAction<number>>;
//   setTwitterId: React.Dispatch<React.SetStateAction<string>>;
// };

// export const AddressReqForm: React.FC<AddressReqFormProp> = memo(
//   ({ addresses, setAddresses, setStep, setTwitterId }) => {
//     const {
//       inputValue,
//       handleClick,
//       handleChange,
//     } = useAddressReqForm({ addresses, setAddresses, setTwitterId, setStep }); // address and setAddress to addresses and setAddresses

//     return (
//       <div className="flex flex-col justify-center gap-y-4 items-center">
//         <div className="flex justify-center gap-x-6 items-center">
//           <div className="flex items-center">

//           <img src="/twitter-bird-transparent.png" className="max-h-14" alt="twitter-bird"/>
//           <input
//             value={inputValue}
//             onChange={(e) => handleChange(e)}
//             type="text"
//             placeholder="@example1, @example2, ..."
//             className="input input-bordered input-primary w-full max-w-xs"
//             />
//             </div>
//           <button className="btn btn-primary" onClick={() => handleClick()}>
//             search
//           </button>
//         </div>
//       </div>
//     );
//   }
// );

// ==========================================================

import { memo, } from "react";
import { useAddressReqForm } from "./useAddressReqForm";

type AddressReqFormProp = {
  addresses: string[];  // Changed from address
  setAddresses: React.Dispatch<React.SetStateAction<string[]>>;  // Changed from setAddress
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setTwitterId: React.Dispatch<React.SetStateAction<string>>;
};

export const AddressReqForm: React.FC<AddressReqFormProp> = memo(
  ({ addresses, setAddresses, setStep, setTwitterId }) => {
    const {
      inputValue,
      handleClick,
      handleChange,
    } = useAddressReqForm({ addresses, setAddresses, setTwitterId, setStep });

    return (
      <div className="flex flex-col justify-center gap-y-4 items-center">
        <div className="flex justify-center gap-x-6 items-center">
          <div className="flex items-center">
            <img src="/twitter-bird-transparent.png" className="max-h-14" alt="twitter-bird"/>

            {/* Change input to textarea */}
            <textarea
              value={inputValue}
              onChange={(e) => handleChange(e)}
              placeholder="@example"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <button className="btn btn-primary" onClick={() => handleClick()}>
            search
          </button>
        </div>
      </div>
    );
  }
);
