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
          <div className="flex flex-col gap-6 bg-base-200 rounded-box p-6 max-w-sm">
            <div className="flex justify-between items-center">
              <Clock className="h-12 w-12" />
              <span className="font-bold text-xl">Feature 1</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-center">
                Get real-time updates on DAO proposals directly in your inbox, powered by our AI engine.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-base-200 rounded-box p-6 max-w-sm">
            <div className="flex justify-between items-center">
              <RefreshCcw className="h-12 w-12" />
              <span className="font-bold text-xl">Feature 2</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-center">
                Manage governance and voting across multiple blockchain networks seamlessly.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-base-200 rounded-box p-6 max-w-sm">
            <div className="flex justify-between items-center">
              <Cpu className="h-12 w-12" />
              <span className="font-bold text-xl">Feature 3</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-center">
                Our AI analyzes proposals and suggests the best actions to simplify decision-making.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-base-200 rounded-box p-6 max-w-sm">
            <div className="flex justify-between items-center">
              <Shield className="h-12 w-12" />
              <span className="font-bold text-xl">Feature 4</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-center">
                Cast your vote safely and securely with automated smart contract interactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-8 bg-base-200 text-center">
        <h2 className="text-4xl font-bold mb-8">How Dao-Tao Works</h2>
        <div className="flex flex-col items-center space-y-8">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <Zap className="h-12 w-12 mr-4" />
                <h2 className="card-title">Step 1</h2>
              </div>
              <p>Securely connect your Web3 wallet to start.</p>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <CheckSquare className="h-12 w-12 mr-4" />
                <h2 className="card-title">Step 2</h2>
              </div>
              <p>Choose the DAOs you’re interested in from a list of cross-chain DAOs.</p>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <Gavel className="h-12 w-12 mr-4" />
                <h2 className="card-title">Step 3</h2>
              </div>
              <p>Receive proposal notifications in real time, and view detailed insights powered by AI.</p>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <ThumbsUp className="h-12 w-12 mr-4" />
                <h2 className="card-title">Step 4</h2>
              </div>
              <p>Vote directly from our platform with one click. Safe and automated.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16 px-8 bg-base-100 text-center">
        <div className="text-4xl font-bold mb-8">Perfect for All Types of DAOs</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl flex flex-col justify-between">
            <div className="card-body">
              <div className="flex items-center">
                <Clock className="h-12 w-12 mr-4" />
                <h2 className="card-title">Cross-Chain Governance</h2>
              </div>
              <p>Govern DAOs across Ethereum, Binance Smart Chain, and more.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl flex flex-col justify-between">
            <div className="card-body">
              <div className="flex items-center">
                <RefreshCcw className="h-12 w-12 mr-4" />
                <h2 className="card-title">Automated Proposal Management</h2>
              </div>
              <p>Track and manage hundreds of DAO proposals automatically.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl flex flex-col justify-between">
            <div className="card-body">
              <div className="flex items-center">
                <Cpu className="h-12 w-12 mr-4" />
                <h2 className="card-title">Secure Community Voting</h2>
              </div>
              <p>Enable community voting with secure, automated processes.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
