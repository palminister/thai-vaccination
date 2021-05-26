# Thailand's Vaccination Dashboard 💉

Developed with `Next.js` + `D3.js` + `Google Sheets API` + `Tailwind JIT` + `AOS`

## What's it all about? 👋

This is a dashboard that monitors the vaccination process in Thailand. It is determined to visualize the hope that Thais can hold on to during this COVID-19 pandemic.

## API Documentation

This API returns JSON responses based on `GET` requests only. There are 3 endpoints for this API:

- `/api/vaccine` : Show administered doses
- `/api/province` : Show administered doses in each province
- `/api/summary` : Show vaccination summary

### Show Administered Doses

Get the amount of vaccination doses administered on each day from 27 Feb 2021 until present.

#### Request

    GET /api/vaccine

#### Response

```json
[
    {
        "date": "27 Feb",
        "totalVac": 0,
        "firstDose": 0,
        "secondDose": 0,
        "vacRate": 0
    },
    ...
    {
        "date": "24 May",
        "totalVac": 3024313,
        "firstDose": 2044123,
        "secondDose": 980190,
        "vacRate": 113649
    }

```

#### Data Dictionary

| Variable     | Explanation                                           |
| ------------ | ----------------------------------------------------- |
| `date`       | Date                                                  |
| `totalVac`   | Total cumulative amount of vaccine administered       |
| `firstDose`  | Cumulative amount of first dose vaccine administered  |
| `secondDose` | Cumulative amount of second dose vaccine administered |
| `vacRate`    | Amount of vaccine administered on the particular date |

### Show Administered Doses in Each Province

Get the **current** amount of vaccination doses administered in each province.

#### Request

    GET /api/province

#### Response

```json
[
    {
        "region": "N",
        "provinceTH": "เชียงราย",
        "province": "Chiang Rai",
        "totalPopulation": 1298304,
        "totalDose": 24346,
        "firstDose": 14170,
        "secondDose": 10176,
        "relativePercentage": 0.94
    },
    ...
    {
        "region": "",
        "provinceTH": "รวม",
        "province": "",
        "totalPopulation": 66920716,
        "totalDose": 2900473,
        "firstDose": 1931365,
        "secondDose": 969108,
        "relativePercentage": 2.17
    }
```

#### Data Dictionary

| Variable             | Explanation                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `region`             | <ul><li>N = North</li><li>NE = Northeast</li><li>E = East</li><li>C = Central</li><li>CB = Bangkok Metropolitan</li><li>W = West</li><li>S = South</li></ul> |
| `provinceTH`         | Province name in Thai                                                                                                                                        |
| `province`           | Province name in English                                                                                                                                     |
| `totalPopulation`    | Total population of the province                                                                                                                             |
| `totalDose`          | Total cumulative amount of vaccine administered in the province                                                                                              |
| `firstDose`          | Cumulative amount of first dose vaccine administered in the province                                                                                         |
| `secondDose`         | Cumulative amount of second dose vaccine administered in the province                                                                                        |
| `relativePercentage` | Amount of vaccine administered in the province by its population (percentage)                                                                                |

### Show Vaccination Summary

Get the vaccination summary info shown in the dashboard

#### Request

    GET /api/summary

#### Response

```json
{
  "vaccineGoalAmount": 100000000,
  "thaiPopulation": 66000000,
  "totalVaccination": 3147227,
  "totalVaccinationToGoalPercentage": 3.15,
  "totalVaccinationToPopulationPercentage": 2.38,
  "firstDose": 2157609,
  "firstDosePercentage": 3.27,
  "secondDose": 989618,
  "secondDosePercentage": 1.5,
  "latestVaccinationRate": 122914,
  "doseCompareToYesterday": 9265,
  "averageVaccinationRate": 100226,
  "yearsLeft": 2.65,
  "latestDate": "25 May"
}
```

#### Data Dictionary

| Variable                                 | Explanation                                                                                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vaccineGoalAmount`                      | The government's goal amount of vaccine to be administered                                                                                                                |
| `thaiPopulation`                         | Current Thailand population (approximated)                                                                                                                                |
| `totalVaccination`                       | Total amount of vaccine administered                                                                                                                                      |
| `totalVaccinationToGoalPercentage`       | Total amount of vaccine administered by the vaccine goal amount                                                                                                           |
| `totalVaccinationToPopulationPercentage` | Total amount of vaccine administered by the entire population                                                                                                             |
| `firstDose`                              | Cumulative amount of first dose vaccine administered                                                                                                                      |
| `firstDosePercentage`                    | Cumulative amount of first dose vaccine administered by the total vaccine goal                                                                                            |
| `secondDose`                             | Cumulative amount of second dose vaccine administered                                                                                                                     |
| `secondDosePercentage`                   | Cumulative amount of second dose vaccine administered by the total vaccine goal                                                                                           |
| `latestVaccinationRate`                  | Amount of vaccine administered on the latest date                                                                                                                         |
| `averageVaccinationRate`                 | Average rate of vaccine administered in the past 7 days                                                                                                                   |
| `yearsLeft`                              | Estimated years left until the vaccine is completely distributed to its goal amount. Calculated by (`vaccineGoalAmount` - `totalVaccination` ) / `averageVaccinationRate` |
| `latestDate`                             | The latest updated date in the dataset                                                                                                                                    |

## Contributors ✨

This project wouldn't be possible without these wonderful people 🙏

- [@lucasrodes](https://github.com/lucasrodes) --> Vaccination Data 💻
- [@padagot](https://www.facebook.com/padagott) --> Content ⌨️
- [@apisit](https://github.com/apisit) --> Thailand GeoJSON 🗺️

💉 [thai-vaccination](https://thai-vaccination.vercel.app/)
