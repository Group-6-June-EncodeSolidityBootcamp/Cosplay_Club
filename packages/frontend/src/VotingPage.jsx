import logo from "./logo.svg";
import "./VotingPage.css";
import { WorldIDWidget } from "@worldcoin/id";

const widgetProps = {
  actionId: "wid_staging_PCNQeDC5CX",
  signal: "user-id-1",
  enableTelemetry: true,
  appName: "cosplayClub",
  signalDescription: "Proof of Personhood",
  theme: "dark",
  debug: true, // DO NOT SET TO `true` IN PRODUCTION
  onSuccess: (result) => console.log(result),
  onError: ({ code, detail }) => console.log({ code, detail }),
  onInitSuccess: () => console.log("Init successful"),
  onInitError: (error) => console.log("Error while initialization World ID", error),
};

export function VotingPage() {
  return (
    <div className="votingPage">
      <header className="votingPage-header">
        <img src={logo} className="votingPage-logo" alt="logo" />
        <p>World ID</p>
        {/* World ID component below */}
        <WorldIDWidget {...widgetProps} />
      </header>
    </div>
  );
}


