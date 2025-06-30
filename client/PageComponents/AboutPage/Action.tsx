import React from "react";

const Action: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
            Discover rare digital art <br /> and collect NFTs
          </h3>
          <p className="text-gray-400 mb-6">
            The NFTs is a one-trick pony that climbed the recent years. The growth
            of NFTs is tremendous, and according to Pymnts.com, the total sales
            volume.
          </p>
          <a
            href="/create"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create
          </a>
        </div>
      </div>
    </div>
  );
};

export default Action;
