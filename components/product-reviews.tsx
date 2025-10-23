"use client"

import { Star } from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
}

interface ProductReviewsProps {
  productName: string
  rating: number
  reviewCount: number
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "John D.",
    rating: 5,
    title: "Excellent quality!",
    content:
      "These headphones exceeded my expectations. Great sound quality and very comfortable to wear for long periods.",
    date: "2 weeks ago",
    helpful: 234,
  },
  {
    id: "2",
    author: "Sarah M.",
    rating: 4,
    title: "Good value for money",
    content: "Very satisfied with this purchase. Battery life is impressive and the noise cancellation works well.",
    date: "1 month ago",
    helpful: 156,
  },
  {
    id: "3",
    author: "Mike T.",
    rating: 5,
    title: "Best headphones I've owned",
    content: "Amazing sound quality, comfortable fit, and the battery lasts forever. Highly recommended!",
    date: "1 month ago",
    helpful: 89,
  },
]

export function ProductReviews({ productName, rating, reviewCount }: ProductReviewsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-card-foreground">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="mb-8 pb-8 border-b border-border">
        <div className="flex items-start gap-8">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary mb-2">{rating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{reviewCount.toLocaleString()} reviews</div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-12">{stars}★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${Math.random() * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-card-foreground">{review.author}</span>
                  <span className="text-xs text-muted-foreground">Verified Purchase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-card-foreground">{review.title}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{review.content}</p>
            <button className="text-xs text-primary hover:underline">Helpful ({review.helpful})</button>
          </div>
        ))}
      </div>
    </div>
  )
}
