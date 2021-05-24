import { getVaccineSheet } from './vaccine'

export async function getSummary() {
  const data = await getVaccineSheet()
  // Total Vaccinated Number
  const goalAmount = 100000000
  const population = 66000000
  const totalVaccinated = await data[data.length - 1].totalVac
  const totalVaccinatedToGoalPercentage =
    totalVaccinated != undefined
      ? parseFloat(((totalVaccinated * 100) / goalAmount).toFixed(2))
      : null
  const totalVaccinatedToPopulationPercentage =
    (totalVaccinated != undefined) & (totalVaccinated != null)
      ? parseFloat(((totalVaccinated * 100) / (population * 2)).toFixed(2))
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
    ((goalAmount - totalVaccinated) / averageVacRate / 365).toFixed(2)
  )
  const latestDate = data != undefined ? data[data.length - 1].date : null
  const summary = {
    vaccineGoalAmount: goalAmount,
    thaiPopulation: population,
    totalVaccinated: totalVaccinated,
    totalVaccinatedToGoalPercentage: totalVaccinatedToGoalPercentage,
    totalVaccinatedToPopulationPercentage:
      totalVaccinatedToPopulationPercentage,
    firstDose: firstDose,
    firstDosePercentage: firstDosePercentage,
    secondDose: secondDose,
    secondDosePercentage: secondDosePercentage,
    todayVaccinationRate: vacRate,
    doseCompareToYesterday: doseCompareToYesterday,
    averageVaccinationRate: averageVacRate,
    yearsLeft: yearsLeft,
    latestDate: latestDate,
  }
  return summary
}
export default async function handler(req, res) {
  const summary = await getSummary()
  res.status(200).json(summary)
}
