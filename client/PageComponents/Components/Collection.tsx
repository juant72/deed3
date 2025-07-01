import React from "react";
import Link from "next/link";

const Collection: React.FC<{ housing, rental, farmhouse, office }> = ({ housing, rental, farmhouse, office }) => {
  const topCollection = [
    {
      name: "Housing",
      link: "/housing",
      item: housing,
    },
    {
      name: "Office",
      link: "/office",
      item: office,
    },
    {
      name: "Farmhouse",
      link: "/farmhouse",
      item: farmhouse,
    },
    {
      name: "Rental",
      link: "/rental",
      item: rental,
    },
  ];

  return (
    <div className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="mb-4 md:mb-0">
            <h3 className="text-3xl font-bold text-white">
              Top Collection
            </h3>
          </div>
          <div>
            <Link href="#" className="inline-flex items-center px-6 py-3 bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white rounded-lg transition-all duration-300 font-medium">
              VIEW ALL
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topCollection.map((collection, i) => (
            <div key={i + 1} className="group">
              <Link
                href={{
                  pathname: `/category${collection.link}`,
                  query: { name: `${collection.name}` },
                }}
                className="block"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="relative mb-4">
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-3">
                      <img
                        src={`/portfolio/portfolio-${i + 15}.jpg`}
                        alt="Nft_Profile"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 rounded-lg overflow-hidden">
                        <img
                          src={`/portfolio/portfolio-${i + 16}.jpg`}
                          alt="Nft_Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-16 rounded-lg overflow-hidden">
                        <img
                          src={`/portfolio/portfolio-${i + 17}.jpg`}
                          alt="Nft_Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-16 rounded-lg overflow-hidden">
                        <img
                          src={`/portfolio/portfolio-${i + 11}.jpg`}
                          alt="Nft_Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-800 overflow-hidden bg-slate-700">
                        <img
                          src={`/client/client-${i + 1}.png`}
                          alt="Nft_Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-8">
                    <h6 className="text-white font-semibold text-lg mb-2">{collection.name}</h6>
                    <span className="text-gray-400 text-sm">{collection.item} Items</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
