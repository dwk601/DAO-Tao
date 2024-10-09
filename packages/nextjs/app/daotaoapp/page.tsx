import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "DAO TAO App",
  description: "Choose DAO",
});

const DAOTAOApp: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Choose DAO</h1>
        <p className="text-neutral">Select your DAO</p>
      </div>
    </>
  );
};

export default DAOTAOApp;
