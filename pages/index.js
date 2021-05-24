import Head from 'next/head'
import { getVaccineSheet } from './api/vaccine'
import { getSummary } from './api/summary'
import { getProvinceSheet } from './api/province'
import Syringe from './components/Syringe'
import Information from './components/Information'
import DailyVaccine from './components/DailyVaccine'
import ThailandMap from './components/ThailandMap'
import Credits from './components/Credits'
import Footer from './components/Footer'
import * as emoji from './data/emoji.json'

export const getStaticProps = async () => {
  const data = await getVaccineSheet()
  const summary = await getSummary()
  const provinceData = await getProvinceSheet()
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
        <link rel="icon" href={emoji.syringe} />
        <link rel="preconnect" href="https://api.mapbox.com"></link>
        <meta
          name="description"
          content="Thailand's Vaccination Dashboard, by Palminister"
        ></meta>
      </Head>
      {/* <div className="test">Hi</div> */}
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
