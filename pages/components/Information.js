import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Information = (data) => {
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
  const sign = data != undefined ? (data.doesDifferenceInt > 0 ? '+' : '-') : ''
  const doseDifference =
    data != undefined ? sign + data.doesDifferenceInt.toLocaleString() : null
  const doseDifferenceClass =
    data != undefined
      ? data.doesDifferenceInt > 0
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
          * คำนวณจากปริมาณวัคซีนเป้าหมาย - จำนวนวัคซีคที่ฉีดไปทั้งหมด /
          อัตราการฉีดวัคซีนเฉลี่ย 7 วันล่าสุด (โดส)
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 p-5 text-center text-gray-100 sm:grid-cols-2 font-anuphan">
        <div className={divClass} data-aos="fade" data-aos-duration="1000">
          <p className={numberClass + ' text-blue-500'}>
            💉{' '}
            {parseInt(
              data != undefined ? data.averageDoseDifference.toFixed() : null
            ).toLocaleString()}
          </p>
          <p className={textClass}>โดส/ วัน โดยเฉลี่ย</p>
        </div>
        <div className={divClass} data-aos="fade" data-aos-duration="1000">
          <p className={doseDifferenceClass}>{doseDifference}</p>
          <p className={textClass}>โดส เทียบกับวันก่อนหน้า</p>
        </div>
        <div
          className={bigDivClass}
          id="firstDose"
          data-aos="fade"
          data-aos-duration="1000"
        >
          <div>
            <p className={numberClass}>🧬</p>
            <p className={numberClass}>
              {data != undefined ? data.firstDosed : null}
            </p>
            <p className={textClass}>คน ได้รับวัคซีน 1 โดส</p>
          </div>
          <div>
            <p className={numberClass + ' text-purple-500'}>
              = {data != undefined ? data.firstDosedPercentage : null}%
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
            <p className={numberClass}>🧬 🧬</p>
            <p className={numberClass}>
              {data != undefined ? data.secondDosed : null}
            </p>
            <p className={textClass}>คน ได้รับวัคซีนครบ 2 โดส</p>
          </div>
          <div>
            <p className={numberClass + ' text-[#B4F060]'}>
              = {data != undefined ? data.secondDosedPercentage : null}%
            </p>
            <p className={textClass}>ของจำนวนประชากร 66 ล้านคน</p>
          </div>
        </div>
        <div className={bigDivClass} data-aos="fade" data-aos-duration="1000">
          <div>
            <p className={numberClass}>💪</p>
            <p className={numberClass}>
              {data != undefined ? data.totalVaccinated : null}
            </p>
            <p className={textClass}>โดส ได้ถูกฉีด</p>
          </div>
          <div>
            <p className={numberClass + ' text-yellow-400'}>
              ={' '}
              {data != undefined ? data.totalVaccinatedToGoalPercentage : null}%
            </p>
            <p className={textClass}>ของเป้าหมาย</p>
            <p className={numberClass + ' text-yellow-400'}>
              ={' '}
              {data != undefined
                ? data.totalVaccinatedToPopulationPercentage
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
