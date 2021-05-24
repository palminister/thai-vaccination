const { google } = require('googleapis')

export async function getVaccineSheet() {
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
    totalVac: parseInt(String(element[4]).split(',').join('')),
    firstDose: parseInt(String(element[5]).split(',').join('')),
    secondDose: parseInt(String(element[6]).split(',').join('')),
    vacRate: parseInt(String(element[7]).split(',').join('')),
  }))
  return data
}
export default async function handler(req, res) {
  const data = await getVaccineSheet()
  res.status(200).json(data)
}
