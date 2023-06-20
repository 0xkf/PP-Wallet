// import { useState } from "react";
// import "./App.css";
// import { AddressReqForm } from "./components/AddressReqForm";
// import { Steps } from "./components/Steps";
// import { NameDomainForm } from "./components/NameDomainForm";
// import { Completed } from "./components/Completed";

// function App() {
//   const [step, setStep] = useState(1);
//   const [address, setAddress] = useState('');
//   const [twitterId, setTwitterId] = useState<string>('');
//   const titles = ["Search Friend's Account", 'Give Him/Her Domain NFT', 'Complete'];
  
//   return (
//     <div className="bg-neutral min-h-screen flex flex-col items-center">
//       <div className="navbar bg-base-100 flex justify-center">
//         <div>
//           <img className="max-h-10" src="/ppw-logo.png" alt="twilight"/>
//         </div>
//         <div>
//           <a
//             className="btn btn-ghost normal-case text-2xl text-primary pl-0"
//             href="/"
//           >
//             PPWallet
//           </a>
//         </div>
//       </div>
//       <div className="flex flex-col gap-y-8">
//         <div className="mt-4">
//           <Steps step={step} stepNames={titles}/>
//         </div>
//         <h1 className="text-2xl text-secondary font-bold">
//           {`STEP${step}: ${titles[step-1]}`}
//         </h1>
//         {step === 1 &&
//         <AddressReqForm setStep={setStep} address={address} setAddress={setAddress} setTwitterId={setTwitterId}/>
//         }
//         {step === 2 && 
//         <NameDomainForm address={address} setStep={setStep} twitterId={twitterId}/>
//         }
//         {step === 3 && 
//         <Completed twitterId={twitterId}/>
//         }
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import "./App.css";
import { AddressReqForm } from "./components/AddressReqForm";
import { Steps } from "./components/Steps";
import { NameDomainForm } from "./components/NameDomainForm";
import { Completed } from "./components/Completed";

function App() {
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<string[]>([]);  // 複数のアドレスを扱えるように変更
  const [twitterId, setTwitterId] = useState<string>('');
  const titles = ["Search Friend's Account", 'Give Him/Her Domain NFT', 'Complete'];
  
  return (
    <div className="bg-neutral min-h-screen flex flex-col items-center">
      <div className="navbar bg-base-100 flex justify-center">
        <div>
          <img className="max-h-10" src="/ppw-logo.png" alt="twilight"/>
        </div>
        <div>
          <a
            className="btn btn-ghost normal-case text-2xl text-primary pl-0"
            href="/"
          >
            PPWallet
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-y-8">
        <div className="mt-4">
          <Steps step={step} stepNames={titles}/>
        </div>
        <h1 className="text-2xl text-secondary font-bold">
          {`STEP${step}: ${titles[step-1]}`}
        </h1>
        {step === 1 &&
        <AddressReqForm setStep={setStep} addresses={addresses} setAddresses={setAddresses} setTwitterId={setTwitterId}/>
        }
        {step === 2 && 
        <NameDomainForm addresses={addresses} setStep={setStep} twitterId={twitterId}/>
        }
        {step === 3 && 
        <Completed twitterId={twitterId}/>
        }
      </div>
    </div>
  );
}

export default App;
