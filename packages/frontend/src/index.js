import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import SeeAllSubmissions from "./SeeAllSubmissions";
import reportWebVitals from './reportWebVitals';
import '@rainbow-me/rainbowkit/styles.css';
import { wallet, connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Rainbow } from "./Rainbow";
import {Verification} from "./WorldID";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai
  ],
  [
    alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.coinbase({ chains })
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
  <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Rainbow />
      </RainbowKitProvider>
    </WagmiConfig>

  <Routes>
    <Route path="/worldID" element={<Verification />} />
    <Route path="/" element={<App />} />
    <Route path="/seeAllSubmissions" element={<SeeAllSubmissions />} />
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
