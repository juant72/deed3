import React from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";

const PageNotFound: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-red-500">404</h2>
          <h3 className="text-2xl font-semibold text-gray-800 mt-4">
            Page not found!
          </h3>
          <p className="text-gray-600 mt-2">
            The page you are looking for is not available.
          </p>
          <Link href="/" className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Go Back To Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
