# RainbowKit Migration Plan - Technical Implementation

## Análisis de Migración: Reown AppKit → RainbowKit + Wagmi

### Current State Analysis

#### Reown AppKit Implementation
```javascript
// Current: /context/index.js
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

const ethersAdapter = new EthersAdapter();
const appKit = createAppKit({
  adapters: [ethersAdapter],
  networks: [mainnet, polygon, arbitrum],
  metadata,
  projectId,
  features: { analytics: true }
});

// Connection methods
await appKit.open();
const isConnected = appKit.getIsConnected();
const address = appKit.getAddress();
```

#### Issues with Current Setup
1. **Project ID Warning**: Development ID causing build warnings
2. **Ecosystem**: Smaller compared to RainbowKit/Wagmi
3. **Type Safety**: Less robust TypeScript support
4. **Community**: Smaller developer community

### RainbowKit + Wagmi Implementation Plan

#### Phase 1: Dependencies Update

```bash
# Remove Reown AppKit
npm uninstall @reown/appkit @reown/appkit-adapter-ethers

# Install RainbowKit stack
npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

#### Phase 2: Configuration Setup

```javascript
// New: /context/wagmi-config.js
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [
    metaMask(),
    walletConnect({ 
      projectId,
      metadata: {
        name: "Deeds3 - Real Estate NFT",
        description: "Decentralized Real Estate Platform",
        url: "https://deeds3.vercel.app",
        icons: ["https://deeds3.vercel.app/logo.png"]
      }
    }),
    coinbaseWallet({
      appName: "Deeds3",
      appLogoUrl: "https://deeds3.vercel.app/logo.png"
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});
```

#### Phase 3: RainbowKit Theme Configuration

```javascript
// New: /context/rainbowkit-theme.js
import {
  getDefaultConfig,
  Chain,
  lightTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit';

export const customTheme = {
  ...lightTheme(),
  colors: {
    ...lightTheme().colors,
    accentColor: '#00d4aa', // Deeds3 brand color
    accentColorForeground: 'white',
    modalBackground: 'white',
    modalBorder: '#e7e7e7',
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
  },
  radii: {
    actionButton: '8px',
    connectButton: '8px',
    menuButton: '8px',
    modal: '16px',
    modalMobile: '16px',
  },
};

export const customDarkTheme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: '#00d4aa',
    accentColorForeground: 'white',
  },
};
```

#### Phase 4: Context Provider Update

```javascript
// Updated: /context/index.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { ethers } from 'ethers';
import { useConnectorClient } from 'wagmi';
import { useToast } from 'react-hot-toast';
import RealEstateABI from './RealEstate.json';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: client } = useConnectorClient();

  // Local state
  const [currentAccount, setCurrentAccount] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [userBalance, setUserBalance] = useState();
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);

  // Toast notifications
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  // Update local state when Wagmi state changes
  useEffect(() => {
    if (isConnected && address) {
      setCurrentAccount(address);
      if (balance) {
        const formattedBalance = ethers.formatEther(balance.value);
        setAccountBalance(formattedBalance);
        setUserBalance(formattedBalance);
      }
    } else {
      setCurrentAccount(null);
      setAccountBalance(null);
      setUserBalance(null);
    }
  }, [isConnected, address, balance]);

  // Smart contract connection
  const connectingWithSmartContract = async () => {
    try {
      if (!client) {
        throw new Error("No wallet client available");
      }

      const provider = new ethers.BrowserProvider(client);
      const signer = await provider.getSigner();
      
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        RealEstateABI,
        signer
      );

      return contract;
    } catch (error) {
      console.log("Error connecting with Smart Contract: ", error);
      throw error;
    }
  };

  // Connect wallet function (for UI buttons)
  const connectWallet = async () => {
    try {
      setLoader(true);
      // RainbowKit handles the connection UI
      // This function is mainly for compatibility
      if (connectors.length > 0) {
        connect({ connector: connectors[0] });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      notifyError("Failed to connect wallet");
      console.log("Connection error:", error);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = async () => {
    try {
      disconnect();
      notifySuccess("Wallet disconnected successfully");
    } catch (error) {
      notifyError("Failed to disconnect wallet");
      console.log("Disconnect error:", error);
    }
  };

  // Check if wallet is connected
  const checkIfWalletConnected = async () => {
    return isConnected ? address : null;
  };

  // Create property function (unchanged)
  const createPropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;

    try {
      setLoader(true);
      const contract = await connectingWithSmartContract();

      const transaction = await contract.listProperty(
        address,
        price,
        propertyTitle,
        category,
        images,
        propertyAddress,
        description
      );

      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction went successfully");
      setCount(count + 1);
      router.push("/author");
    } catch (err) {
      setLoader(false);
      notifyError("Something went wrong");
      console.log("contract call failure", err);
    }
  };

  return (
    <StateContext.Provider
      value={{
        // Connection state
        currentAccount,
        accountBalance,
        userBalance,
        loader,
        count,
        
        // Wagmi state (new)
        isConnected,
        address,
        balance,
        
        // Functions
        connectWallet,
        disconnectWallet,
        checkIfWalletConnected,
        connectingWithSmartContract,
        createPropertyFunction,
        
        // Notifications
        notifySuccess,
        notifyError,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
```

#### Phase 5: App.js Provider Setup

```javascript
// Updated: /pages/_app.js
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StateContextProvider } from '../context';
import { wagmiConfig } from '../context/wagmi-config';
import { customTheme } from '../context/rainbowkit-theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          <StateContextProvider>
            <Component {...pageProps} />
          </StateContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
```

#### Phase 6: UI Components Update

```javascript
// Option 1: Use RainbowKit ConnectButton
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header>
      {/* Replace custom connect button with RainbowKit */}
      <ConnectButton />
    </header>
  );
};

// Option 2: Custom button with RainbowKit modal
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const CustomConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  if (isConnected) {
    return <ConnectButton />;
  }

  return (
    <button 
      onClick={openConnectModal}
      className="btn btn-primary-alta btn-small"
    >
      Wallet connect
    </button>
  );
};
```

### Migration Timeline

#### Day 1: Setup & Dependencies
- [ ] Install RainbowKit + Wagmi
- [ ] Remove Reown AppKit dependencies
- [ ] Create Wagmi config
- [ ] Setup RainbowKit theme

#### Day 2: Core Migration
- [ ] Update context provider
- [ ] Migrate smart contract functions
- [ ] Update _app.js providers
- [ ] Test basic connection

#### Day 3: UI Integration
- [ ] Update connect buttons
- [ ] Test all wallet flows
- [ ] Update error handling
- [ ] Test multi-chain support

#### Day 4: Testing & Optimization
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Performance optimization
- [ ] Documentation update

### Risk Assessment

#### Low Risk
- **RainbowKit Stability**: Mature, well-tested library
- **Wagmi Foundation**: Industry standard
- **API Compatibility**: Similar patterns to current implementation

#### Medium Risk
- **Learning Curve**: New hooks and patterns
- **Bundle Size**: Slight increase (~20-30KB)
- **Configuration**: More initial setup required

#### Mitigation Strategies
1. **Parallel Development**: Develop on separate branch
2. **Gradual Migration**: Phase by phase implementation
3. **Rollback Plan**: Keep Reown AppKit code until migration verified
4. **Testing**: Comprehensive testing on testnet first

### Expected Benefits

#### Developer Experience
- **Better TypeScript**: Auto-generated types
- **React Hooks**: Cleaner, more React-like patterns
- **DevTools**: Better debugging and development tools
- **Documentation**: Extensive, well-maintained docs

#### User Experience
- **More Wallets**: Broader wallet support
- **Better UI**: Polished, customizable components
- **Performance**: Optimized for production use
- **Mobile**: Better mobile wallet support

#### Long-term Benefits
- **Future-Proof**: Industry standard stack
- **Community**: Larger ecosystem and support
- **Updates**: Regular updates and new features
- **Hiring**: Easier to find developers familiar with stack

### Success Metrics

#### Technical
- [ ] Build passes without warnings
- [ ] All wallet connections work
- [ ] Smart contract interactions functional
- [ ] Performance maintained or improved

#### User Experience
- [ ] Connect flow intuitive
- [ ] Mobile experience smooth
- [ ] Error handling graceful
- [ ] UI/UX meets design standards

#### Business
- [ ] No user-facing breaking changes
- [ ] Development velocity maintained
- [ ] Technical debt reduced
- [ ] Team confidence improved

---

**Recommendation**: Proceed with RainbowKit migration for better long-term maintainability and alignment with industry standards.
