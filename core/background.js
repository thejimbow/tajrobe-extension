import { ReviewsRepository } from './reviews/reviews.repository.js'
import { ReviewsService } from './reviews/reviews.service.js'
import { config } from './config.js'
import { registerScripts } from './scripts.js'
import { BrowserContext } from './browser/browser.context.js'

async function bootstrap () {
  const browserContext = BrowserContext({ context: chrome??browser })
  browserContext.onAddonInstalled(()=>{
    console.log('hehehehehehereree');
  })
  const reviewsRepository = ReviewsRepository({ config, browserContext })
  await reviewsRepository.initialize()
  const reviewsService = ReviewsService({ reviewsRepository })
  await registerScripts({browserContext})
}

bootstrap()
