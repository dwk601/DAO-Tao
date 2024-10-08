"use client";

import { CheckSquare, Clock, Cpu, Gavel, RefreshCcw, Shield, ThumbsUp, Zap } from "lucide-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-extrabold mb-4 text-center">
            Revolutionize Your DAO Governance with AI & Automation
          </h1>
          <h2 className="text-2xl mb-8 text-center">
            Streamline decision-making and governance for your DAO across multiple blockchains—powered by advanced AI
            and automation.
          </h2>
          <Address address={connectedAddress} />
          {/* Add your hero visual here */}
        </div>
      </div>

      {/* Value Proposition Section */}
      <div id="value-proposition" className="py-16 px-8 bg-base-100 text-center">
        <h2 className="text-4xl font-bold mb-8">Why Dao-Tao? Automate. Simplify. Scale.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <Clock className="h-12 w-12 mb-4" />
            <p className="font-medium">
              Get real-time updates on DAO proposals directly in your inbox, powered by our AI engine.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCcw className="h-12 w-12 mb-4" />
            <p className="font-medium">Manage governance and voting across multiple blockchain networks seamlessly.</p>
          </div>
          <div className="flex flex-col items-center">
            <Cpu className="h-12 w-12 mb-4" />
            <p className="font-medium">
              Our AI analyzes proposals and suggests the best actions to simplify decision-making.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-12 w-12 mb-4" />
            <p className="font-medium">
              Cast your vote safely and securely with automated smart contract interactions.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-8 bg-base-200 text-center">
        <h2 className="text-4xl font-bold mb-8">How Dao-Tao Works</h2>
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <Zap className="h-12 w-12 mb-4" />
            <p className="font-medium">Securely connect your Web3 wallet to start.</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckSquare className="h-12 w-12 mb-4" />
            <p className="font-medium">Choose the DAOs you’re interested in from a list of cross-chain DAOs.</p>
          </div>
          <div className="flex flex-col items-center">
            <Gavel className="h-12 w-12 mb-4" />
            <p className="font-medium">
              Receive proposal notifications in real time, and view detailed insights powered by AI.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ThumbsUp className="h-12 w-12 mb-4" />
            <p className="font-medium">Vote directly from our platform with one click. Safe and automated.</p>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16 px-8 bg-base-100 text-center">
        <h2 className="text-4xl font-bold mb-8">Perfect for All Types of DAOs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Clock className="h-12 w-12 mb-4" />
            <p className="font-medium">Govern DAOs across Ethereum, Binance Smart Chain, and more.</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCcw className="h-12 w-12 mb-4" />
            <p className="font-medium">Track and manage hundreds of DAO proposals automatically.</p>
          </div>
          <div className="flex flex-col items-center">
            <Cpu className="h-12 w-12 mb-4" />
            <p className="font-medium">Enable community voting with secure, automated processes.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
