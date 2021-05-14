import Head from 'next/head'
const { google } = require('googleapis')
import Syringe from './components/Syringe'
import Information from './components/Information'
import DailyVaccine from './components/DailyVaccine'
import ThailandMap from './components/ThailandMap'
import Credits from './components/Credits'
import Footer from './components/Footer'

export const getStaticProps = async () => {
  const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
  const fixedKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(
    new RegExp('\\\\n', 'g'),
    '\n'
  )
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    fixedKey,
    scopes
  )

  const sheets = google.sheets({ version: 'v4', auth: jwt })
  const raw = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Raw_Data!A:H',
  })
  const data = raw.data.values.slice(1).map((element) => ({
    date: element[1],
    totalVac: element[4],
    firstDose: element[5],
    secondDose: element[6],
    vacRate: element[7],
  }))

  // Total Vaccinated Number
  const goalAmount = 100000000
  const population = 66000000
  const totalVaccinated = await data[data.length - 1].totalVac
  const totalVaccinatedInt =
    totalVaccinated != undefined
      ? parseInt(String(totalVaccinated).split(',').join(''))
      : null
  const totalVaccinatedToGoalPercentage =
    totalVaccinatedInt != undefined
      ? parseFloat(((totalVaccinatedInt * 100) / goalAmount).toFixed(2))
      : null
  const totalVaccinatedToPopulationPercentage =
    (totalVaccinatedInt != undefined) & (totalVaccinatedInt != null)
      ? parseFloat(((totalVaccinatedInt * 100) / (population * 2)).toFixed(2))
      : null
  // First Dose Number
  const firstDosed = await data[data.length - 1].firstDose
  const firstDosedInt =
    firstDosed != undefined
      ? parseInt(String(firstDosed).split(',').join(''))
      : null
  const firstDosedPercentage =
    (firstDosedInt != undefined) & (firstDosedInt != null)
      ? parseFloat(((firstDosedInt * 100) / population).toFixed(2))
      : null
  // Second Dose Number
  const secondDosed = await data[data.length - 1].secondDose
  const secondDosedInt =
    secondDosed != undefined
      ? parseInt(String(secondDosed).split(',').join(''))
      : null
  const secondDosedPercentage =
    (secondDosedInt != undefined) & (secondDosedInt != null)
      ? parseFloat(((secondDosedInt * 100) / population).toFixed(2))
      : null
  // Rate Number and Styling
  const doesDifferenceInt =
    data != undefined
      ? parseInt(
          String(await data[data.length - 1].vacRate)
            .split(',')
            .join('')
        )
      : null
  // Average Rate
  let sumDifference = 0
  for (let i = 1; i < 8; i++) {
    sumDifference +=
      data != undefined
        ? parseInt(
            String(await data[data.length - i].vacRate)
              .split(',')
              .join('')
          )
        : 0
  }
  const averageDoseDifference = sumDifference / 7
  // Years left
  const yearsLeft = parseFloat(
    ((goalAmount - totalVaccinatedInt) / averageDoseDifference / 365).toFixed(2)
  )
  const latestDate = data != undefined ? data[data.length - 1].date : null
  const summary = {
    goalAmount: goalAmount,
    population: population,
    totalVaccinated: totalVaccinated,
    totalVaccinatedInt: totalVaccinatedInt,
    totalVaccinatedToGoalPercentage: totalVaccinatedToGoalPercentage,
    totalVaccinatedToPopulationPercentage:
      totalVaccinatedToPopulationPercentage,
    firstDosed: firstDosed,
    firstDosedInt: firstDosedInt,
    firstDosedPercentage: firstDosedPercentage,
    secondDosed: secondDosed,
    secondDosedInt: secondDosedInt,
    secondDosedPercentage: secondDosedPercentage,
    doesDifferenceInt: doesDifferenceInt,
    averageDoseDifference: averageDoseDifference,
    yearsLeft: yearsLeft,
    latestDate: latestDate,
  }
  //  Map Data
  const provinceRaw = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Raw_Data_Provinces!A:I',
  })
  const provinceData = provinceRaw.data.values.slice(3).map((element) => ({
    region: element[0],
    provinceTH: element[1],
    province: element[2],
    totalPopulation: element[3],
    totalDose: element[4],
    firstDose: element[5],
    secondDose: element[6],
    relativePercentage: parseFloat(String(element[8]).slice(0, -1)),
  }))
  return {
    props: {
      data: data,
      summary: summary,
      provinceData: provinceData,
    },
    revalidate: 60,
  }
}

const Home = (data) => {
  // console.log(data)
  if (!data) return <h1 className="font-sourcecode">404 This Page is Dead</h1>
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black">
      <Head>
        <title>Thailand's Vaccination</title>
        <meta
          property="og:url"
          content="https://thai-vaccination.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thailand's Vaccination Dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content="This is a dashboard that monitors the vaccination process in Thailand. It is determined to visualize the hope that Thais can hold on to during this COVID-19 pandemic."
        />
        <meta
          property="og:image"
          content="https://palminister-portfolio.vercel.app/_next/image?url=%2Fmysite-thumbnail%2Fthai-vaccination.png&w=3840&q=75"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💉</text></svg>"
        ></link>
        <link rel="preconnect" href="https://api.mapbox.com"></link>
        <meta
          name="description"
          content="Thailand's Vaccination Dashboard, by Palminister"
        ></meta>
      </Head>
      <Syringe data={data.summary} />
      <Information data={data.summary} />
      <DailyVaccine data={data.data} />
      <ThailandMap data={data.provinceData} />
      <Credits />
      <Footer />
    </div>
  )
}
export default Home
