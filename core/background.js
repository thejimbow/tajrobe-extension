import { ReviewsRepository } from './reviews/reviews.repository.js'
import { ReviewsService } from './reviews/reviews.service'

async function bootstrap () {
  const reviewsRepository = ReviewsRepository({ config })
  const reviewsService = ReviewsService({ reviewsRepository })
}

bootstrap()
