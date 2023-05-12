function createReviews ({ browserContext }, { reviews, rate }) {
  if (!reviews?.length) return
  const container = createContainer()
  createHeader({ browserContext }, { rate, reviewsCount: reviews.length })
  container.innerHTML = reviews.map(createReview).join('<hr/>')
}

function createReview (review) {
  return `
  <div>
    <h3 class="o-box__title">${review?.job_name} ${createRating(review.rate)}</h3> 
    <span>${getFormattedDate(review?.date)}</span>
    <div style="margin: 1rem 0">
      ${createProsAndCons({
        opinion: review?.pros,
        name: 'مزایا',
        color: 'green'
      })}
      ${createProsAndCons({
        opinion: review?.cons,
        name: 'معایب',
        color: 'red'
      })}
    </div>
    <p>${review?.description}</p>
  </div>
`
}

function createContainer () {
  const view = getReviewsSection()
  if (!view) return null
  view.setAttribute('id', 't-reviews')
  const clonedView = view.cloneNode()
  view.parentNode.insertBefore(clonedView, view.nextSibling)
  return clonedView
}

function getReviewsSection () {
  return document.querySelector('.c-jobView')
}

function createHeader ({ browserContext }, { rate, reviewsCount }) {
  const header = document.createElement('h2')
  const logoIconUrl = browserContext.resolveAsset('/war/icon.svg')
  header.innerHTML = `
  <img src="${logoIconUrl}" width="25px"/>
  <span>تجربه دیگران</span>
  <span>
    ${reviewsCount}
    نظر
  </span>
  ${createRating(rate)}
`
  header.classList.add('c-heading', 'c-heading--h3')
  header.style.color = '#6a1e9b'
  getReviewsSection().parentNode.insertBefore(
    header,
    getReviewsSection().nextSibling
  )
  return header
}

function isJobDescriptionPage () {
  const url = new URL(window.location.href.toLowerCase())
  return /\/companies\/.*\/jobs\//gm.test(url.pathname)
}

function getCompanyUrl () {
  return document
    .querySelector('.c-companyHeader__meta')
    .querySelector('span a[rel=nofollow]').href
}

async function main () {
  if (!isJobDescriptionPage()) return
  const browserContext = BrowserContext({ context: chrome ?? browser })
  const companyUrl = getCompanyUrl()
  if (!companyUrl) return
  const companyData = await getCompanyData(browserContext, companyUrl)
  if (!companyData) return
  createReviews(
    { browserContext },
    {
      reviews: companyData.reviews.sort(sortReviews),
      rate: companyData.totalRate
    }
  )
}

main()
