import "@/styles/globals.css";
import { Component } from "react";
import {ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {StateContextProvider} from "../context";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";

const clientId=process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;


const App=({Component, pageProps}) => {
  return (
    <>
    <ThirdwebProvider clientId={clientId} activeChain={PolygonAmoyTestnet}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
   
   
    
    <script src="/js/vendor/jquery.js"></script>
    <script src="/js/vendor/bootstrap.min.js"></script>
    <script src="/js/vendor/modernizer.min.js"></script>
    <script src="/js/vendor/jquery-ui.js"></script>
    <script src="/js/vendor/jquery.custom-file-input.js"></script>
    <script src="/js/vendor/jquery.nice-select.min.js"></script>
    <script src="/js/vendor/jquery.style.swicher.js"></script>
    <script src="/js/vendor/jquery-appear.js"></script>
    <script src="/js/vendor/isotop.js"></script>
    <script src="/js/vendor/imageloaded.js"></script>
    <script src="/js/vendor/backtoTop.js"></script>
    <script src="/js/vendor/count-down.js"></script>
    <script src="/js/vendor/feather.min.js"></script>
    <script src="/js/vendor/js.cookie.js"></script>
    <script src="/js/vendor/maralis.js"></script>
    <script src="/js/vendor/nft.js"></script>
    <script src="/js/vendor/odometer.js"></script>
    <script src="/js/vendor/particles.js"></script>
    <script src="/js/vendor/scrolltrigger.js"></script>
    <script src="/js/vendor/slick.min.js"></script>
    <script src="/js/vendor/vanilla.tilt.js"></script>
    <script src="/js/vendor/sal.min.js"></script>
    <script src="/js/vendor/savePopup.js"></script>
    <script src="/js/vendor/web3.min.js"></script>
    
    </>
  ); 
}

export default App;

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
