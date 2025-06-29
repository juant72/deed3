import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useAccount, useDisconnect } from "wagmi";
import type { Connector } from "wagmi";
import { useMemo } from "react";

/**
 * Types for useAuth hook
 */
interface SocialUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthUser {
  address: string | undefined;
  socialProfile: SocialUser | null | undefined;
  name: string | null;
  email: string | null | undefined;
  image: string | null;
  id: string | null | undefined;
  authMethods: {
    wallet: boolean;
    social: boolean;
  };
}

interface AuthState {
  // Wallet state
  walletAddress: string | undefined;
  isWalletConnected: boolean;
  walletConnector: Connector | undefined;
  
  // Social auth state
  socialSession: Session | null | undefined;
  isSocialAuthenticated: boolean;
  socialUser: SocialUser | null | undefined;
  isSessionLoading: boolean;
  
  // Combined state
  isFullyAuthenticated: boolean;
  isPartiallyAuthenticated: boolean;
  isAuthenticated: boolean;
  
  // Loading states
  isLoading: boolean;
  
  // User data
  user: AuthUser;
}

interface AuthHelpers {
  // Status checkers
  hasWallet: () => boolean;
  hasSocial: () => boolean;
  hasBoth: () => boolean;
  hasAny: () => boolean;
  
  // User info getters
  getDisplayName: () => string;
  getProfileImage: () => string | null;
  getUserId: () => string | null | undefined;
  
  // Auth method checkers
  isWalletOnly: () => boolean;
  isSocialOnly: () => boolean;
  isHybrid: () => boolean;
  
  // Disconnect helper
  disconnectWallet: () => void;
  
  // Get auth provider info
  getAuthProvider: () => 'hybrid' | 'wallet' | 'social' | 'none';
  
  // Get wallet info
  getWalletInfo: () => {
    address: string | undefined;
    connector: string | undefined;
    isConnected: boolean;
  };
  
  // Get social info
  getSocialInfo: () => {
    provider: string | undefined;
    user: SocialUser | null | undefined;
    isAuthenticated: boolean;
  };
}

type AuthRequirement = 'wallet' | 'social' | 'both' | 'full' | 'any' | 'partial';

/**
 * Custom hook for managing combined authentication state
 * Combines wallet connection (via Wagmi) and social authentication (via NextAuth)
 */
export const useAuth = (): AuthState & AuthHelpers => {
  const { data: session, status: sessionStatus } = useSession();
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

  // Authentication state
  const authState = useMemo((): AuthState => {
    const isWalletConnected = isConnected && !!address;
    const isSocialAuthenticated = !!session && !!session.user;
    const isSessionLoading = sessionStatus === "loading";
    
    return {
      // Wallet state
      walletAddress: address,
      isWalletConnected,
      walletConnector: connector,
      
      // Social auth state
      socialSession: session,
      isSocialAuthenticated,
      socialUser: session?.user || null,
      isSessionLoading,
      
      // Combined state
      isFullyAuthenticated: isWalletConnected && isSocialAuthenticated,
      isPartiallyAuthenticated: isWalletConnected || isSocialAuthenticated,
      isAuthenticated: isWalletConnected || isSocialAuthenticated,
      
      // Loading states
      isLoading: isSessionLoading,
      
      // User data
      user: {
        address,
        socialProfile: session?.user,
        name: session?.user?.name || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null),
        email: session?.user?.email,
        image: session?.user?.image || (address ? `https://effigy.im/a/${address}.svg` : null),
        
        // Combined user ID (prefer wallet address, fallback to social ID)
        id: address || (session?.user as any)?.id || session?.user?.email,
        
        // Authentication methods
        authMethods: {
          wallet: isWalletConnected,
          social: isSocialAuthenticated,
        }
      }
    };
  }, [address, isConnected, connector, session, sessionStatus]);

  // Helper functions
  const helpers = useMemo((): AuthHelpers => ({
    // Status checkers
    hasWallet: () => authState.isWalletConnected,
    hasSocial: () => authState.isSocialAuthenticated,
    hasBoth: () => authState.isFullyAuthenticated,
    hasAny: () => authState.isAuthenticated,
    
    // User info getters
    getDisplayName: () => {
      if (authState.socialUser?.name) return authState.socialUser.name;
      if (authState.walletAddress) return `${authState.walletAddress.slice(0, 6)}...${authState.walletAddress.slice(-4)}`;
      return 'Anonymous';
    },
    
    getProfileImage: () => {
      if (authState.socialUser?.image) return authState.socialUser.image;
      if (authState.walletAddress) return `https://effigy.im/a/${authState.walletAddress}.svg`;
      return null;
    },
    
    getUserId: () => authState.walletAddress || authState.socialUser?.id || authState.socialUser?.email,
    
    // Auth method checkers
    isWalletOnly: () => authState.isWalletConnected && !authState.isSocialAuthenticated,
    isSocialOnly: () => !authState.isWalletConnected && authState.isSocialAuthenticated,
    isHybrid: () => authState.isWalletConnected && authState.isSocialAuthenticated,
    
    // Disconnect helper
    disconnectWallet: () => {
      if (authState.isWalletConnected) {
        disconnect();
      }
    },
    
    // Get auth provider info
    getAuthProvider: () => {
      if (authState.isWalletConnected && authState.isSocialAuthenticated) {
        return 'hybrid';
      } else if (authState.isWalletConnected) {
        return 'wallet';
      } else if (authState.isSocialAuthenticated) {
        return 'social';
      }
      return 'none';
    },
    
    // Get wallet info
    getWalletInfo: () => ({
      address: authState.walletAddress,
      connector: authState.walletConnector?.name,
      isConnected: authState.isWalletConnected,
    }),
    
    // Get social info
    getSocialInfo: () => ({
      provider: (session as any)?.provider,
      user: authState.socialUser,
      isAuthenticated: authState.isSocialAuthenticated,
    }),
  }), [authState, disconnect, session]);

  // Return combined state and helpers
  return {
    ...authState,
    ...helpers,
  };
};

/**
 * Hook for checking if user meets specific authentication requirements
 */
export const useAuthRequirement = (requirement: AuthRequirement = 'any') => {
  const auth = useAuth();
  
  const meets = useMemo(() => {
    switch (requirement) {
      case 'wallet':
        return auth.isWalletConnected;
      case 'social':
        return auth.isSocialAuthenticated;
      case 'both':
      case 'full':
        return auth.isFullyAuthenticated;
      case 'any':
      case 'partial':
      default:
        return auth.isAuthenticated;
    }
  }, [auth, requirement]);
  
  return {
    meets,
    auth,
    requirement,
    missing: requirement === 'both' ? {
      wallet: !auth.isWalletConnected,
      social: !auth.isSocialAuthenticated,
    } : null
  };
};

/**
 * Hook for protected routes/components
 */
export const useProtectedAuth = (requirement: AuthRequirement = 'any', redirectTo: string = '/login') => {
  const { meets, auth } = useAuthRequirement(requirement);
  
  return {
    isAuthorized: meets,
    isLoading: auth.isLoading,
    shouldRedirect: !auth.isLoading && !meets,
    redirectTo,
    auth,
  };
};
