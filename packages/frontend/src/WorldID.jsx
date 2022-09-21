import "./WorldID.css";
import { WorldIDWidget } from "@worldcoin/id";
import { useState } from "react";
import WorldCoinContractABI from "./assets/worldIDABI";
import { ethers } from "ethers";
const WorldCoinAddress = "0x4311d6b0c0973317F47dDCB5aA34Ea6058dbC3a8";

export const getAccount = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  let account = accounts[0].toString();
  return account;
};

export const connectWorldCoin = async() =>{
  const provider = new ethers.providers.AlchemyProvider("maticmum", "kOxMlUZntCmiWXNOLXC6JncY_QkcVioa");
  const signer = provider.getSigner();

  const contract = new ethers.Contract(WorldCoinAddress, WorldCoinContractABI, signer);
  return contract;
}

export  const Verification = () => {
  const[verify,setVerify] = useState(false)
  const verfiyUser=async(verificationResponse)=>{
    console.log(verificationResponse);
    if(verificationResponse){
      let account = await getAccount()
      let worldCoin = await connectWorldCoin();
      let merkle_root = verificationResponse.merkle_root;
      let nullifier_hash = verificationResponse.nullifier_hash;
      let proof = verificationResponse.nullifier_hash;

      await worldCoin.on('Verify',(response)=>{
        setVerify(response)
      })
      await worldCoin.verifyAndExecute(account,merkle_root,nullifier_hash,proof,7); //replace 7 with token id.
    }
  }
  return(<div>
    <WorldIDWidget
      actionId="wid_staging_7919c463dab9a1b7ba9d4e836d4a6018" // obtain this from developer.worldcoin.org
      signal="user-id-1"
      enableTelemetry
      onSuccess={(verificationResponse) => verfiyUser(verificationResponse)}
      onError={(error) => console.error(error)}
    />

  </div>);
};
// export default Verification;


// const widgetProps = {
//   actionId: "wid_staging_7919c463dab9a1b7ba9d4e836d4a6018",
//   signal: "user-id-1",
//   enableTelemetry: true,
//   appName: "cosplayClub",
//   signalDescription: "Proof of Personhood",
//   theme: "light",
//   debug: true, // DO NOT SET TO `true` IN PRODUCTION
//   onSuccess: (verificationResponse) => {
//     console.log(verificationResponse);
//     // call contract.verifyAndExecute(...result,tokenId)
//   },
//   onError: ({ code, detail }) => console.log({ code, detail }),
//   onInitSuccess: () => console.log("Init successful"),
//   onInitError: (error) => console.log("Error while initialization World ID", error),
// };

// export function WorldID() {
//   return (
//     <div className="worldIDPage">
//       <header className="worldIDPage-header">
//         <p>Verify World ID to submit Vote:</p>
//         {/* World ID component below */}
//         <WorldIDWidget {...widgetProps} />
//       </header>
//     </div>
//   );
// }
