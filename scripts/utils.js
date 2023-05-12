function normalizeDateString (dateString) {
  if (!dateString) return null
  return String(dateString).length === 10
    ? parseInt(`${dateString}000`)
    : parseInt(dateString)
}

function getFormattedDate (dateString) {
  const date = normalizeDateString(dateString)
  if (!date) return ''
  return new Date(date).toLocaleDateString('fa-IR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function sortReviews (a, b) {
  return normalizeDateString(a.date) >= normalizeDateString(b.date) ? -1 : 1
}

async function getCompanyData (browserContext, companyUrl) {
  const companiesStringified = await browserContext.getFromStorage('companies')
  const companies = JSON.parse(companiesStringified)
  return companies.find(({ site }) => {
    try {
      const rUrl = new URL(site)
      const cUrl = new URL(companyUrl)
      return rUrl.host.toLowerCase() === cUrl.host.toLowerCase()
    } catch (error) {
      return null
    }
  })
}

function createProsAndCons ({ opinion, name, color }) {
  const composedOpinions = composeOpinions(opinion)
  if (!composedOpinions) return ''
  return ` 
    <h5>${name}</h5>
    <p style="color:${color}">${composedOpinions}</p>
  `
}

function composeOpinions (opinion) {
  if (!opinion && !opinion?.length) return null
  if (Array.isArray(opinion)) return opinion.join(', ')
  if (typeof opinion === 'string')
    return opinion.split(',').filter(Boolean).join(', ')
  return null
}

function createRating (rate = null) {
  if (rate === null || rate === '') return ''
  return `
  <span style="color:gold!important">(${Number(rate).toLocaleString('fa-IR', {
    maximumFractionDigits: 1
  })} از ${Number(5).toLocaleString('fa-IR')})</span>
  `
}
