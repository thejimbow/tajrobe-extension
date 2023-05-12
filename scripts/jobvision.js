async function main () {
  const browserContext = BrowserContext({ context: chrome ?? browser })
  const url = document
    .querySelector('.job-detail-external')
    .querySelector('a.text-primary').href
  const regex = /class="pl-4" href="(.*)"> .*<\/a><span _/gm
  const companyUrl = await fetch(url).then(async response => {
    const text = await response.text()
    const [, companyUrl] = regex.exec(text) ?? []
    return companyUrl
  })
  const result = await browserContext.getFromStorage('companies')
  const results = JSON.parse(result)
  const item = results.find(r=>{
    try {
        const rUrl = new URL(r.site)
        const cUrl = new URL(companyUrl)
        return rUrl.host.toLowerCase()===cUrl.host.toLowerCase()
    } catch (error) {
        return null
    }
  })
  console.log({item});
}

main()
