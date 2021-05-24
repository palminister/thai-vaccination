import { useEffect } from 'react'
import Image from 'next/image'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Information = (data) => {
  const emoji = require('../data/emoji.json')
  useEffect(() => {
    Aos.init({ duration: 700, once: true })
  }, [])
  // Class Styling Initialization
  const divClass =
    'p-5 sm:col-span-1 col-span-1 rounded-xl bg-gray-700 bg-opacity-20 '
  const bigDivClass =
    'p-5 sm:col-span-2 col-span-1 rounded-xl bg-gray-700 bg-opacity-20 pb-10'
  const numberClass = 'text-5xl p-5'
  const textClass = 'text-lg font-thin'

  data = data.data
  // Rate Number Styling
  const sign =
    data != undefined ? (data.doseCompareToYesterday > 0 ? '+' : '') : ''
  const doseCompareToYesterday =
    data != undefined
      ? sign + data.doseCompareToYesterday.toLocaleString()
      : null
  const doseCompareToYesterdayClass =
    data != undefined
      ? data.doseCompareToYesterday > 0
        ? 'text-5xl p-5 text-green-400'
        : 'text-5xl p-5 text-red-500'
      : ''
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="pb-40 text-center text-gray-100 font-anuphan"
        data-aos="zoom-in-up"
        data-aos-delay={100}
      >
        <p className="pb-2 text-5xl ">
          อีกเพียง
          <span className="text-yellow-400 text-7xl">
            <br />
            {data != undefined ? data.yearsLeft : null}{' '}
          </span>
          ปี
        </p>
        <p className="text-3xl "> ก็จะครบเป้าหมาย 100,000,000 โดส (70%)*</p>
        <p className="p-4 text-xs text-gray-300">
          * คำนวณจาก (ปริมาณวัคซีนเป้าหมาย - จำนวนวัคซีคที่ฉีดไปทั้งหมด) /
          อัตราการฉีดวัคซีนเฉลี่ย 7 วันล่าสุด (โดส)
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 p-5 text-center text-gray-100 sm:grid-cols-2 font-anuphan">
        <div className={divClass} data-aos="fade" data-aos-duration="1000">
          <p className={numberClass + ' text-blue-500'}>
            {parseInt(
              data != undefined ? data.averageVaccinationRate.toFixed() : null
            ).toLocaleString()}
          </p>
          <p className={textClass + ' pb-5'}>โดส ได้ถูกฉีดโดยเฉลี่ยใน 7 วัน</p>
        </div>
        <div className={divClass} data-aos="fade" data-aos-duration="1000">
          <p className={numberClass + ' text-green-400'}>
            {data != undefined
              ? data.todayVaccinationRate.toLocaleString()
              : null}
          </p>
          <p className={textClass + ' pb-5'}>โดส ได้ถูกฉีดวันนี้</p>
        </div>
        <div className={bigDivClass} data-aos="fade" data-aos-duration="1000">
          <div>
            <div className="flex justify-center p-2">
              <Image
                src={emoji.syringe}
                alt="dna"
                width={60}
                height={60}
                priority="true"
              ></Image>
            </div>
            <p className={doseCompareToYesterdayClass}>
              {data != undefined ? doseCompareToYesterday : null}
            </p>
            <p className={textClass}>โดส เทียบกับวันก่อนหน้า</p>
          </div>
        </div>
        <div
          className={bigDivClass}
          id="firstDose"
          data-aos="fade"
          data-aos-duration="1000"
        >
          <div>
            <div className="flex justify-center p-5">
              <Image
                src={emoji.dna}
                alt="dna"
                width={50}
                height={50}
                priority="true"
              ></Image>
            </div>
            <p className={numberClass}>
              {data != undefined ? data.firstDose.toLocaleString() : null}
            </p>
            <p className={textClass}>คน ได้รับวัคซีน 1 โดส</p>
          </div>
          <div>
            <p className={numberClass + ' text-purple-500'}>
              ={' '}
              {data != undefined
                ? data.firstDosePercentage.toLocaleString()
                : null}
              %
            </p>
            <p className={textClass}>ของจำนวนประชากร 66 ล้านคน</p>
          </div>
        </div>
        <div
          className={bigDivClass}
          id="secondDose"
          data-aos="fade"
          data-aos-duration="1000"
        >
          <div>
            <div className="flex justify-center p-5">
              <Image
                src={emoji.dna}
                alt="dna"
                width={50}
                height={50}
                priority="true"
              ></Image>
              <span className="w-3"></span>
              <Image
                src={emoji.dna}
                alt="dna"
                width={50}
                height={50}
                priority="true"
              ></Image>
            </div>
            <p className={numberClass}>
              {data != undefined ? data.secondDose.toLocaleString() : null}
            </p>
            <p className={textClass}>คน ได้รับวัคซีนครบ 2 โดส</p>
          </div>
          <div>
            <p className={numberClass + ' text-[#B4F060]'}>
              ={' '}
              {data != undefined
                ? data.secondDosePercentage.toLocaleString()
                : null}
              %
            </p>
            <p className={textClass}>ของจำนวนประชากร 66 ล้านคน</p>
          </div>
        </div>
        <div className={bigDivClass} data-aos="fade" data-aos-duration="1000">
          <div>
            <div className="flex justify-center p-5">
              <Image
                src={emoji.biceps}
                alt="dna"
                width={50}
                height={50}
                priority="true"
              ></Image>
            </div>
            <p className={numberClass}>
              {data != undefined ? data.totalVaccinated.toLocaleString() : null}
            </p>
            <p className={textClass}>โดส ได้ถูกฉีด</p>
          </div>
          <div>
            <p className={numberClass + ' text-yellow-400'}>
              ={' '}
              {data != undefined
                ? data.totalVaccinatedToGoalPercentage.toLocaleString()
                : null}
              %
            </p>
            <p className={textClass}>ของเป้าหมาย</p>
            <p className={numberClass + ' text-yellow-400'}>
              ={' '}
              {data != undefined
                ? data.totalVaccinatedToPopulationPercentage.toLocaleString()
                : null}
              %
            </p>
            <p className={textClass}>ของจำนวนประชากร</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
