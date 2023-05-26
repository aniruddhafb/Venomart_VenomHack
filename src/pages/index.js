import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="relative pb-10 pt-20 md:pt-32 lg:h-[88vh]">
      <div className="container h-full" id='heroBack'>
        <div className="grid h-full items-center gap-4 md:grid-cols-12">
          <div
            className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-4">
            <h1
              className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-6xl xl:text-7xl">
              Buy, sell and collect NFTs.
            </h1>
            <p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
              Largest Marketplace on venom blockchain
            </p>
            <div className="flex space-x-4">
              <Link href="/nft/createNFT"
                className="w-36 rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all hover:bg-accent-dark">
                Create
              </Link>
              <Link href="/nft/exploreNFTs"
                className="w-36 rounded-full bg-white py-3 px-8 text-center font-semibold text-[#189C87] shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume">
                Explore
              </Link>
            </div>
          </div>

          <div className="col-span-6 xl:col-span-8">
            <div className="relative text-center md:pl-8 md:text-right">
              <svg viewbox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
                className="mt-8 inline-block w-72 rotate-[8deg] sm:w-full lg:w-[24rem] xl:w-[35rem]">
                <defs>
                  <clipPath id="clipping" clipPathUnits="userSpaceOnUse">
                    <path d="
                    M 0, 100
                    C 0, 17.000000000000004 17.000000000000004, 0 100, 0
                    S 200, 17.000000000000004 200, 100
                        183, 200 100, 200
                        0, 183 0, 100
                " fill="#9446ED"></path>
                  </clipPath>
                </defs>
                <g clip-path="url(#clipping)">
                  <image href="../../dark.svg" width="200" height="200" />
                </g>
              </svg>
              <img src="img/hero/3D_elements.png" alt="" className="absolute top-0 animate-fly md:-right-[10%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
