import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Rainbow = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "16vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ConnectButton />
    </div>
  );
};

