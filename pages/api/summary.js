import { getVaccineSheet } from './vaccine'

export async function getSummary() {
  const data = await getVaccineSheet()
  // Total Vaccination Number
  const goalAmount = 100000000
  const population = 66000000
  const totalVaccination = await data[data.length - 1].totalVac
  const totalVaccinationToGoalPercentage =
    totalVaccination != undefined
      ? parseFloat(((totalVaccination * 100) / goalAmount).toFixed(2))
      : null
  const totalVaccinationToPopulationPercentage =
    (totalVaccination != undefined) & (totalVaccination != null)
      ? parseFloat(((totalVaccination * 100) / (population * 2)).toFixed(2))
      : null
  // First Dose Number
  const firstDose = await data[data.length - 1].firstDose
  const firstDosePercentage =
    (firstDose != undefined) & (firstDose != null)
      ? parseFloat(((firstDose * 100) / population).toFixed(2))
      : null
  // Second Dose Number
  const secondDose = await data[data.length - 1].secondDose
  const secondDosePercentage =
    (secondDose != undefined) & (secondDose != null)
      ? parseFloat(((secondDose * 100) / population).toFixed(2))
      : null
  // Rate Number
  const vacRate = data != undefined ? await data[data.length - 1].vacRate : null
  const doseCompareToYesterday =
    data != undefined
      ? data[data.length - 1].vacRate - data[data.length - 2].vacRate
      : null
  // Average Rate
  let sumDifference = 0
  for (let i = 1; i < 8; i++) {
    sumDifference += data != undefined ? data[data.length - i].vacRate : 0
  }
  const averageVacRate = parseFloat((sumDifference / 7).toFixed(2))
  // Years left
  const yearsLeft = parseFloat(
    ((goalAmount - totalVaccination) / averageVacRate / 365).toFixed(2)
  )
  const latestDate = data != undefined ? data[data.length - 1].date : null
  const summary = {
    vaccineGoalAmount: goalAmount,
    thaiPopulation: population,
    totalVaccination: totalVaccination,
    totalVaccinationToGoalPercentage: totalVaccinationToGoalPercentage,
    totalVaccinationToPopulationPercentage:
      totalVaccinationToPopulationPercentage,
    firstDose: firstDose,
    firstDosePercentage: firstDosePercentage,
    secondDose: secondDose,
    secondDosePercentage: secondDosePercentage,
    latestVaccinationRate: vacRate,
    doseCompareToYesterday: doseCompareToYesterday,
    averageVaccinationRate: averageVacRate,
    yearsLeft: yearsLeft,
    latestDate: latestDate,
  }
  return summary
}
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const summary = await getSummary()
      res.status(200).json(summary)
    } catch (e) {
      console.log(e)
      res.status(404).send({ error: ':(' })
    }
  } else {
    res.status(501).send({
      error: `${req.method} method is not supported by the server and cannot be handled`,
    })
  }
}
