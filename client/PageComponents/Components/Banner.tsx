import React from "react";
import Link from "next/link";

const Banner: React.FC = () => {
  const category = [
    {
      name: "Housing",
      link: "/housing",
      worth: 535.566,
    },
    {
      name: "Office",
      link: "/office",
      worth: 6435.66,
    },
    {
      name: "Farmhouse",
      link: "/farmhouse",
      worth: 12445.566,
    },
    {
      name: "Rental",
      link: "/rental",
      worth: 34535.566,
    },
    {
      name: "Commercial",
      link: "/commercial",
      worth: 553435.566,
    },
    {
      name: "Country",
      link: "/country",
      worth: 1234535,
    },
  ];

  return (
    <div className="pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative">
                  <a className="block">
                    <img
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      src="/portfolio/portfolio-11.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
                    <h5 className="text-white font-semibold text-lg mb-1">
                      <a className="hover:text-blue-400 transition-colors">@encrypia</a>
                    </h5>
                    <span className="text-blue-400 text-sm">Join Membership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.map((el, i) => (
                <div key={i + 1} className="group">
                  <div className="relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300">
                    <div className="relative">
                      <Link
                        href={{
                          pathname: `/category${el.link}`,
                          query: { name: `${el.name}` },
                        }}
                        className="block"
                      >
                        <img
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          src={`/portfolio/portfolio-${i + 12}.jpg`}
                          alt="Nft_Profile"
                        />
                      </Link>
                    </div>
                    <div className="p-4">
                      <h5 className="text-white font-semibold text-lg mb-2">
                        <Link href="#" className="hover:text-blue-400 transition-colors">{el.name}</Link>
                      </h5>
                      <span className="text-gray-400">{el.worth} MATIC</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
