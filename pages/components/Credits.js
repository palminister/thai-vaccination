import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Image from 'next/image'

const Credits = () => {
  useEffect(() => {
    Aos.init({ duration: 600, once: true })
  }, [])
  return (
    <div className="">
      <div className="flex justify-center py-10">
        <h1
          className="text-2xl font-anuphan text-gray-200"
          data-aos="fade"
          data-aos-duration="700"
        >
          <span className="text-green-400">{'> '}</span>ขอบคุณข้อมูลจาก
        </h1>
      </div>
      <div className="flex justify-center pb-24">
        <div className="flex flex-wrap justify-center max-w-2xl gap-7">
          <div data-aos="fade">
            <a
              href="https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations/country_data/Thailand.csv"
              target="_blank"
              rel="noreferrer"
            >
              <div className="h-[5rem] m-5 rounded-xl overflow-hidden">
                <Image
                  src="/lucasrodes.png"
                  alt="lucasrodes"
                  width="80"
                  height="80"
                ></Image>
              </div>
              <p className="bg-green-700 hover:bg-opacity-30 bg-opacity-20 rounded-md m-2  text-center text-green-400 font-mono">
                Data
              </p>
            </a>
          </div>
          <div data-aos="fade">
            <a
              href="https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vSKl0LkLkxoXgA2rhVkypR2xx3hcrJoaXkkiici24mmjKomWmiRUEp-IGWsfpv5ZHn2gj0ZzRaOu2T2/pubhtml#"
              target="_blank"
              rel="noreferrer"
            >
              <div className="h-[5rem] m-5">
                <Image
                  src="/padagot.png"
                  alt="padagot"
                  width="80"
                  height="80"
                ></Image>
              </div>
              <p className="bg-green-700 hover:bg-opacity-30 bg-opacity-20 w-24 m-2 rounded-md text-center text-green-400 font-mono">
                Content
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Credits
