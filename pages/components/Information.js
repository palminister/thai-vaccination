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

  // Constant Initialization
  data = data.data
  const goalAmount = 100000000
  const population = 66000000

  // Total Vaccinated Number
  const totalVaccinated = data[data.length - 1].totalVac
  const totalVaccinatedInt = parseInt(totalVaccinated.replaceAll(',', ''))
  const totalVaccinatedGoalPercentage = parseFloat(
    ((totalVaccinatedInt * 100) / goalAmount).toFixed(2)
  )
  const totalVaccinatedPopulationPercentage = parseFloat(
    ((totalVaccinatedInt * 100) / (population * 2)).toFixed(2)
  )

  // First Dose Number
  const firstDosed = data[data.length - 1].firstDose
  const firstDosedInt = parseInt(firstDosed.replaceAll(',', ''))
  const firstDosedPercentage = parseFloat(
    ((firstDosedInt * 100) / population).toFixed(2)
  )
  // Second Dose Number
  const secondDosed = data[data.length - 1].secondDose
  const secondDosedInt = parseInt(secondDosed.replaceAll(',', ''))
  const secondDosedPercentage = parseFloat(
    ((secondDosedInt * 100) / population).toFixed(2)
  )

  // Rate Number and Styling
  const doesDifferenceInt = parseInt(
    data[data.length - 1].vacRate.replaceAll(',', '')
  )
  const sign = doesDifferenceInt > 0 ? '+' : '-'
  const doseDifference = sign + data[data.length - 1].vacRate
  const doseDifferenceClass =
    doesDifferenceInt > 0
      ? 'text-5xl p-5 text-green-400'
      : 'text-5xl p-5 text-red-500'

  // Average Rate
  let sumDifference = 0
  for (let i = 1; i < 8; i++) {
    sumDifference += parseInt(data[data.length - i].vacRate.replaceAll(',', ''))
  }
  const averageDoseDifference = sumDifference / 7

  // Years left
  const yearsLeft = parseFloat(
    ((goalAmount - totalVaccinatedInt) / averageDoseDifference / 365).toFixed(2)
  )

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
            {yearsLeft}{' '}
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
            💉 {parseInt(averageDoseDifference.toFixed()).toLocaleString()}
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
            <p className={numberClass}>{firstDosed}</p>
            <p className={textClass}>คน ได้รับวัคซีน 1 โดส</p>
          </div>
          <div>
            <p className={numberClass + ' text-purple-500'}>
              = {firstDosedPercentage}%
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
            <p className={numberClass}>{secondDosed}</p>
            <p className={textClass}>คน ได้รับวัคซีนครบ 2 โดส</p>
          </div>
          <div>
            <p className={numberClass + ' text-[#B4F060]'}>
              = {secondDosedPercentage}%
            </p>
            <p className={textClass}>ของจำนวนประชากร 66 ล้านคน</p>
          </div>
        </div>
        <div className={bigDivClass} data-aos="fade" data-aos-duration="1000">
          <div>
            <p className={numberClass}>💪</p>
            <p className={numberClass}>{totalVaccinated}</p>
            <p className={textClass}>โดส ได้ถูกฉีด</p>
          </div>
          <div>
            <p className={numberClass + ' text-yellow-400'}>
              = {totalVaccinatedGoalPercentage}%
            </p>
            <p className={textClass}>ของเป้าหมาย</p>
            <p className={numberClass + ' text-yellow-400'}>
              = {totalVaccinatedPopulationPercentage}%
            </p>
            <p className={textClass}>ของจำนวนประชากร</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
