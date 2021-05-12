import { Link } from 'react-scroll'

const Syringe = (data) => {
  data = data.data
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="absolute w-[100%] p-5 font-anuphan top-[22%] text-center">
        <p className="text-5xl text-white">
          คนไทยฉีดวัคซีน<span className="text-yellow-400">ถึงไหนแล้ว</span> ?
        </p>
        <p className="p-3 pr-5 text-sm text-right text-gray-300 sm:p-5 sm:text-center">
          <span className="text-green-400">{'> '}</span>อัปเดตล่าสุด{' '}
          {data != undefined ? data.latestDate : null}, 2021
        </p>
      </div>
      <div className="absolute p-5 text-lg w-screen text-white font-anuphan bottom-[18%] text-center justify-center">
        <div className="relative max-w-lg m-auto">
          <div className="flex flex-wrap justify-center">
            <Link
              to="firstDose"
              spy={true}
              smooth={true}
              offset={-150}
              className='className="flex p-2 m-auto cursor-pointer'
            >
              <div className="flex p-2 m-auto">
                <span className="bg-gradient-to-br from-purple-500 to-blue-500 w-5 h-5 mt-[0.15rem] mr-2"></span>
                <p className="text-white hover:text-yellow-400">
                  ได้รับวัคซีน 1 โดส
                </p>
              </div>
            </Link>
            <Link
              to="secondDose"
              spy={true}
              smooth={true}
              offset={-150}
              className='className="flex p-2 m-auto cursor-pointer'
            >
              <div className="flex p-2 m-auto">
                <span className="bg-gradient-to-br from-[#B4F060] to-green-400 w-5 h-5 mt-[0.15rem] mr-2"></span>
                <p className="text-white hover:text-yellow-400">
                  ได้รับวัคซีนครบ 2 โดส
                </p>
              </div>
            </Link>
            <div className="flex p-2 m-auto">
              <span className=" bg-gradient-to-b from-gray-200 to-gray-700 opacity-40 w-16 h-5 mt-[0.15rem] mr-2"></span>
              <p className="">ประชากร 66 ล้านคน</p>
            </div>
          </div>
        </div>
      </div>
      {/* Syringe Drawing */}
      <div className="relative m-auto right-64 sm:right-0">
        {/* data */}
        <div className="absolute rounded-xl overflow-hidden w-[40rem] left-[-20rem] h-[5rem] top-[-2.5rem] z-20 opacity-90">
          <div className="relative">
            <Link to="secondDose" spy={true} smooth={true} offset={-150}>
              <button
                className="absolute bg-gradient-to-br from-[#B4F060] to-green-400 h-[5rem] right-0 focus:outline-none"
                style={{
                  width: `${
                    data != undefined ? data.secondDosedPercentage : 0
                  }%`,
                }}
              ></button>
            </Link>
            <Link to="firstDose" spy={true} smooth={true} offset={-150}>
              <button
                className="absolute bg-gradient-to-br from-purple-500 to-blue-500 h-[5rem] focus:outline-none"
                style={{
                  width: `${
                    data != undefined ? data.firstDosedPercentage : 0
                  }%`,
                  right: `${
                    data != undefined ? data.secondDosedPercentage : 0
                  }%`,
                }}
              ></button>
            </Link>
          </div>
        </div>
        {/* herd-immnunity */}
        <div className="absolute z-20 bg-gradient-to-b from-red-500 to-blue-500 rounded-b-lg w-[0.3rem] left-[-12rem] h-[8.75rem] top-[-2.5rem]">
          <div className="relative">
            <p className="absolute text-blue-400 font-anuphan top-[8rem] text-xs left-[0.6rem] w-[10rem]">
              Herd Immunity (~80%)
            </p>
          </div>
        </div>
        {/* goal */}
        <div className="absolute z-20 bg-gradient-to-b from-purple-500 to-yellow-400 rounded-b-lg w-[0.3rem] left-[-8rem] h-[6.8rem] top-[-2.5rem]">
          <div className="relative">
            <p className="absolute text-yellow-400 font-anuphan top-[6rem] text-xs left-[0.6rem] w-[10rem]">
              เป้าหมาย (70%)
            </p>
          </div>
        </div>
        {/* big-verticle */}
        <div className="absolute bg-gradient-to-b from-gray-200 to-gray-700 opacity-40 rounded-lg w-[2rem] left-[-20rem] h-[8rem] top-[-4rem]"></div>
        {/* big-needle */}
        <div className="absolute bg-gradient-to-b from-gray-200 to-gray-700 opacity-40 rounded-r-lg w-[1.5rem] left-[20rem] h-[3rem] top-[-1.5rem]"></div>
        {/* small-needle */}
        <div className="absolute bg-gradient-to-b from-gray-50 to-gray-700 opacity-40 rounded-r-lg w-[7rem] left-[21.5rem] h-[0.3rem] top-[-0.15rem]"></div>
        {/* inner */}
        <div
          className="absolute bg-gradient-to-b from-gray-200 to-gray-700 opacity-40 rounded-lg w-[42rem] left-[-22rem] h-[3rem] top-[-1.5rem]"
          //   style={{ left: `${-22 - totalDose / 2.5}rem` }}
        >
          <div className="relative">
            <div className="absolute bg-gradient-to-b from-gray-100 to-gray-700 opacity-80 rounded-lg w-[2rem] left-[-1rem] h-[5rem] top-[-1rem]"></div>
          </div>
        </div>
        {/* outer */}
        <div className="z-10 absolute bg-gradient-to-b from-gray-200 to-gray-700 opacity-30 rounded-xl w-[40rem] left-[-20rem] h-[5rem] top-[-2.5rem]"></div>
      </div>
    </div>
  )
}
export default Syringe
