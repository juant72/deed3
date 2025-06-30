import { ethers } from "ethers";

// Contract method types for better type safety
export type ContractMethod<T = any> = (...args: any[]) => Promise<T>;

// Real Estate Contract interface
export interface IRealEstateContract {
  createRealEstate: ContractMethod<ethers.TransactionResponse>;
  getAllRealEstate: ContractMethod<any[]>;
  buyRealEstate: ContractMethod<ethers.TransactionResponse>;
  updatePrice: ContractMethod<ethers.TransactionResponse>;
  updateRealEstate: ContractMethod<ethers.TransactionResponse>;
}

// Type for contract methods
export type RealEstateContractMethods = {
  [K in keyof IRealEstateContract]: IRealEstateContract[K];
};

// Helper function to safely call contract methods
export const safeContractCall = async <T>(
  contractMethod: (() => Promise<T>) | undefined,
  errorMessage: string
): Promise<T> => {
  if (!contractMethod) {
    throw new Error(`Contract method not available: ${errorMessage}`);
  }
  return contractMethod();
};
