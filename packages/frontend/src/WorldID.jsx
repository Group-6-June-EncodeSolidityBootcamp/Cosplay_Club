import "./WorldID.css";
import { WorldIDWidget } from "@worldcoin/id";

import contractABI from "./assets/worldIDABI";
const CONTRACT_ADDRESS = "0xa05AD8C8FA9252626bcA667107E4e8eA6581bff0";

const widgetProps = {
  actionId: "wid_staging_7919c463dab9a1b7ba9d4e836d4a6018",
  signal: "user-id-1",
  enableTelemetry: true,
  appName: "cosplayClub",
  signalDescription: "Proof of Personhood",
  theme: "light",
  debug: true, // DO NOT SET TO `true` IN PRODUCTION
  onSuccess: (result) => {
    console.log(result);
    // call contract.verifyAndExecute(...result,tokenId)
  },
  onError: ({ code, detail }) => console.log({ code, detail }),
  onInitSuccess: () => console.log("Init successful"),
  onInitError: (error) => console.log("Error while initialization World ID", error),
};

export function WorldID() {
  return (
    <div className="worldIDPage">
      <header className="worldIDPage-header">
        <p>Verify World ID to submit Vote:</p>
        {/* World ID component below */}
        <WorldIDWidget {...widgetProps} />
      </header>
    </div>
  );
}


