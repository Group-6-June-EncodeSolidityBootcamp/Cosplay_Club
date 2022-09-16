import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FixedNumber } from "ethers";

export const Rainbow = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "16vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "60px",
        marginBottom: "-120px"
      }}
    >
      <ConnectButton />
    </div>
  );
};

