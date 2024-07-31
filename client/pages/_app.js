import "@/styles/globals.css";
import { Component } from "react";
import {ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {StateContextProvider} from "../context";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";

const clientId=process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;


const App=({Component, pageProps}) => {
  return (
    <ThirdwebProvider clientId={clientId} activeChain={PolygonAmoyTestnet}>
      <StateContextProvider>
        <Component {...pageProps} />;
      </StateContextProvider>
    </ThirdwebProvider>
  )
  
};

export default App;

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
