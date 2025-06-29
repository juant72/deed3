import React, { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { getCsrfToken, signIn, SignInResponse } from "next-auth/react";
import { SiweMessage } from "siwe";

/**
 * SIWE (Sign-In with Ethereum) Component
 * 
 * This component handles the complete SIWE flow:
 * 1. Generate a SIWE message with nonce
 * 2. Request user signature
 * 3. Submit to NextAuth for verification
 * 4. Create authenticated session
 */

interface SiweAuthProps {
  onSuccess?: (data: {
    type: 'siwe';
    address: string;
    chainId: number;
    session: SignInResponse;
  }) => void;
  onError?: (error: {
    type: 'siwe';
    error: string;
  }) => void;
  className?: string;
}

const SiweAuth: React.FC<SiweAuthProps> = ({ onSuccess, onError, className = "" }) => {
  const { address, isConnected, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSiweSignIn = async (): Promise<void> => {
    if (!address || !isConnected || !chainId) {
      const error = "Wallet not connected";
      console.error(error);
      if (onError) onError({ type: 'siwe', error });
      return;
    }

    setIsLoading(true);
    
    try {
      // Get CSRF token from NextAuth
      const nonce = await getCsrfToken();
      if (!nonce) {
        throw new Error("Failed to get CSRF token");
      }

      // Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to Deeds3",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
        issuedAt: new Date().toISOString(),
      });

      // Generate message string
      const messageText = message.prepareMessage();

      // Request signature from user
      const signature = await signMessageAsync({ 
        account: address,
        message: messageText 
      });

      // Submit to NextAuth
      const result = await signIn("siwe", {
        message: JSON.stringify(message),
        signature,
        redirect: false,
      });

      if (result?.ok) {
        console.log("SIWE authentication successful");
        if (onSuccess) {
          onSuccess({ 
            type: 'siwe', 
            address, 
            chainId, 
            session: result 
          });
        }
      } else {
        throw new Error(result?.error || "SIWE authentication failed");
      }

    } catch (error: any) {
      console.error("SIWE authentication error:", error);
      if (onError) {
        onError({ 
          type: 'siwe', 
          error: error.message || "Unknown error" 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected || !address) {
    return (
      <div className={`text-gray-500 text-sm ${className}`}>
        Connect your wallet first to use SIWE authentication
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <button
        onClick={handleSiweSignIn}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Signing...
          </>
        ) : (
          <>
            🔐 Sign-In with Ethereum
          </>
        )}
      </button>
      
      <p className="text-xs text-gray-600">
        This will request a signature to verify wallet ownership and create an authenticated session.
      </p>
    </div>
  );
};

export default SiweAuth;
