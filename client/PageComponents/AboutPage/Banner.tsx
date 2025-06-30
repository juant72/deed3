import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Direct Teams. <br /> For Your Dedicated Dreams
          </h2>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <div
            className="bg-cover bg-center h-full w-full"
            style={{
              backgroundImage: "url(/images/bg_image_22.jpg)",
            }}
          ></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">
            Why We Do This
          </h3>
          <p className="text-gray-400 mb-4">
            NFTs are virtual tokens that represent ownership of something
            inherently distinct and scarce, whether it be a physical or digital
            item, such as artwork, a soundtrack, a collectible, an in-game item
            or real estate.
          </p>
          <a
            href="/blog"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            See Our Blog
          </a>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">
            Helping You Grow In Every Stage
          </h3>
          <p className="text-gray-400">
            NFTs are virtual tokens that represent ownership of something
            inherently distinct and scarce, whether it be a physical or digital
            item, such as artwork, a soundtrack, a collectible, an in-game item
            or real estate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
