import Head from 'next/head'
const { google } = require('googleapis')
import Syringe from './components/Syringe'
import Information from './components/Information'
import DailyVaccine from './components/DailyVaccine'
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
  const totalVaccinatedInt = parseInt(
    String(totalVaccinated).replaceAll(',', '')
  )
  const totalVaccinatedToGoalPercentage = parseFloat(
    (
      (parseInt(String(totalVaccinated).replaceAll(',', '')) * 100) /
      goalAmount
    ).toFixed(2)
  )
  const totalVaccinatedToPopulationPercentage = parseFloat(
    (
      (parseInt(String(totalVaccinated).replaceAll(',', '')) * 100) /
      (population * 2)
    ).toFixed(2)
  )
  // First Dose Number
  const firstDosed = await data[data.length - 1].firstDose
  const firstDosedInt = parseInt(String(firstDosed).replaceAll(',', ''))
  const firstDosedPercentage = parseFloat(
    (
      (parseInt(String(firstDosed).replaceAll(',', '')) * 100) /
      population
    ).toFixed(2)
  )
  // Second Dose Number
  const secondDosed = await data[data.length - 1].secondDose
  const secondDosedInt = parseInt(String(secondDosed).replaceAll(',', ''))
  const secondDosedPercentage = parseFloat(
    (
      (parseInt(String(secondDosed).replaceAll(',', '')) * 100) /
      population
    ).toFixed(2)
  )
  // Rate Number and Styling
  const doesDifferenceInt = parseInt(
    String(await data[data.length - 1].vacRate).replaceAll(',', '')
  )
  // Average Rate
  let sumDifference = 0
  for (let i = 1; i < 8; i++) {
    sumDifference +=
      data != undefined
        ? parseInt(
            String(await data[data.length - i].vacRate).replaceAll(',', '')
          )
        : 0
  }
  const averageDoseDifference = sumDifference / 7
  // Years left
  const yearsLeft = parseFloat(
    ((goalAmount - totalVaccinatedInt) / averageDoseDifference / 365).toFixed(2)
  )
  const latestDate = await data[data.length - 1].date
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
  return {
    props: {
      data: data,
      summary: summary,
    },
    revalidate: 60,
  }
}

const Home = (data) => {
  if (!data) return <h1 className="font-sourcecode">404 This Page is Dead</h1>
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black">
      <Head>
        <title>Thai Vaccination</title>
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
      <Credits />
      <Footer />
    </div>
  )
}
export default Home
