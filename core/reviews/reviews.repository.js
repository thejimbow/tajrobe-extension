export const ReviewsRepository = ({ config, browserContext }) => {
  return {
    async initialize () {
      const cachedCompanies = await browserContext.getFromStorage('companies')
      if (cachedCompanies?.length) return
      const { companies, error } = await fetch(config.REVIEWS_RESOURCE_URL)
        .then(async response => {
          const companies = await response.json()
          return { companies }
        })
        .catch(error => ({ error }))
      if (error) console.error({ error })
      await browserContext.setToStorage('companies', JSON.stringify(companies))
    },
    async findOneByDomain () {}
  }
}
