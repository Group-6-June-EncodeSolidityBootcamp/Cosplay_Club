import logo from "./logo.svg";
import "./WorldID.css";
import { WorldIDWidget } from "@worldcoin/id";

const widgetProps = {
  actionId: "wid_staging_7919c463dab9a1b7ba9d4e836d4a6018",
  signal: "user-id-1",
  enableTelemetry: true,
  appName: "cosplayClub",
  signalDescription: "Proof of Personhood",
  theme: "light",
  debug: true, // DO NOT SET TO `true` IN PRODUCTION
  onSuccess: (result) => console.log(result),
  onError: ({ code, detail }) => console.log({ code, detail }),
  onInitSuccess: () => console.log("Init successful"),
  onInitError: (error) => console.log("Error while initialization World ID", error),
};

export function WorldID() {
  return (
    <div className="worldIDPage">
      <header className="worldIDPage-header">
        <img src={logo} className="worldIDPage-logo" alt="logo" />
        <p>World ID</p>
        {/* World ID component below */}
        <WorldIDWidget {...widgetProps} />
      </header>
    </div>
  );
}


