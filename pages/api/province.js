const { google } = require('googleapis')

export async function getProvinceSheet() {
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
  //  Map Data
  const provinceRaw = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Raw_Data_Provinces!A:I',
  })
  const provinceData = provinceRaw.data.values.slice(3).map((element) => ({
    region: element[0],
    provinceTH: element[1],
    province: element[2],
    totalPopulation: parseInt(String(element[3]).split(',').join('')),
    totalDose: parseInt(String(element[4]).split(',').join('')),
    firstDose: parseInt(String(element[5]).split(',').join('')),
    secondDose: parseInt(String(element[6]).split(',').join('')),
    relativePercentage: parseFloat(String(element[8]).slice(0, -1)),
  }))
  return provinceData
}
export default async function handler(req, res) {
  const provinceData = await getProvinceSheet()
  res.status(200).json(provinceData)
}