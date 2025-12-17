import { useEffect, useState } from 'react'
import { getReviews } from '@/services/api'
import type { Review } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Wifi, Tv, Coffee } from 'lucide-react'

export default function PropertyPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    getReviews({ isVisible: true})
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar*/}
      <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">
            Flex Living
          </span>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#">Locations</a>
            <a href="#">Corporate</a>
            <a href="#">Landlords</a>
          </div>
          <Button variant="outline" size="sm">
            Book Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="h-[400px] bg-slate-100 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2670&auto=format&fit=crop"
          alt="Apartment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-0 w-full">
          <div className="container mx-auto px-6 text-white">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 mb-2">
              Featured
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Modern Apt in Shoreditch
            </h1>
            <div className="flex items-center gap-2 mt-2 text-lg">
              <MapPin className="w-5 h-5" />
              <span>Shoreditch, London</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold mb-4">About this home</h2>
            <p className="text-slate-600 leading-relaxed">
              Enjoy a stylish experience at this centrally-located place.
              Perfect for business travelers and tourists alike. Steps away from
              the best coffee shops and restaurants in Shoreditch.
            </p>

            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2 text-slate-600">
                <Wifi className="w-5 h-5" /> Fast Wifi
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Tv className="w-5 h-5" /> Smart TV
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Coffee className="w-5 h-5" /> Nespresso
              </div>
            </div>
          </section>

          <hr />

          {/* Comments */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Guest Reviews</h2>
              <Badge variant="secondary" className="text-base px-3 py-1">
                ★ 4.9 · {reviews.length} reviews
              </Badge>
            </div>

            {loading ? (
              <p>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <div className="p-8 bg-slate-50 rounded-xl text-center text-slate-500">
                No reviews yet. Be the first to stay!
              </div>
            ) : (
              <div className="grid gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                          {review.guestName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {review.guestName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-yellow-500 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(review.rating) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 mt-2 line-clamp-3">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Col: Reservation  */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">
                £150{' '}
                <span className="text-base font-normal text-slate-500">
                  / night
                </span>
              </span>
            </div>
            <Button className="w-full size-lg bg-black hover:bg-slate-800">
              Reserve
            </Button>
            <p className="text-xs text-center text-slate-400 mt-4">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
