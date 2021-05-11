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
  return {
    props: {
      data: data,
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
      <Syringe data={data.data} />
      <Information data={data.data} />
      <DailyVaccine data={data.data} />
      <Credits />
      <Footer />
    </div>
  )
}
export default Home
