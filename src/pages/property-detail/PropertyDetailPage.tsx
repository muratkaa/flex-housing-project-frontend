import { PROPERTIES } from '@/data/properties';
import { ArrowLeft, Bath, Bed, CheckCircle, MapPin, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PublicReviewCard } from '@/components/PublicReviewCard';
import { Button } from '@/components/ui/button';
import type { Review } from '@/types';
import { getReviews } from '@/services/api';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const property = PROPERTIES.find((p) => p.id === Number(id));


  useEffect(() => {
    if (property) {
      const fetchPropertyReviews = async () => {
        setLoadingReviews(true);
        try {
          const data = await getReviews({
            listingName: property.title,

          });

          const publicReviews = data.filter(r => r.isVisible);
          setReviews(publicReviews);
        } catch (error) {
          console.error("Failed to load reviews", error);
        } finally {
          setLoadingReviews(false);
        }
      };
      fetchPropertyReviews();
    }
  }, [property]);

  if (!property) {
    return <div className="p-10 text-center">Property not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* 1. HERO IMAGE */}
      <div className="relative h-[50vh] w-full bg-slate-200">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <Link to="/properties" className="absolute top-6 left-6 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm hover:bg-white transition-colors">
          <ArrowLeft size={20} className="text-slate-900" />
        </Link>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- LEFT COLUMN (DETAILS) --- */}
          <div className="lg:col-span-2">

            {/* Title Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-slate-500 text-sm">
                    <MapPin size={16} className="mr-1 text-slate-400" />
                    {property.location}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-xl text-slate-900">{property.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-4">
                    {reviews.length} reviews
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600"><Users size={20} /></div>
                  <div className="text-sm"><span className="block font-bold text-slate-900">{property.guests}</span> Guests</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600"><Bed size={20} /></div>
                  <div className="text-sm"><span className="block font-bold text-slate-900">{property.bedrooms}</span> Bedrooms</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600"><Bath size={20} /></div>
                  <div className="text-sm"><span className="block font-bold text-slate-900">{property.bathrooms}</span> Baths</div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">About this space</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Experience the best of London in this stunning {property.title}.
                  Centrally located in {property.location}, this apartment offers modern amenities,
                  high-speed Wi-Fi, and a fully equipped kitchen. Perfect for business travelers
                  and families alike looking for a comfortable stay.
                </p>
              </div>

              {/* Amenities */}
              <div className="mt-8">
                 <h3 className="font-semibold text-lg text-slate-900 mb-4">Amenities</h3>
                 <div className="grid grid-cols-2 gap-3">
                    {['Fast Wi-Fi', 'Smart TV', 'Coffee Maker', 'Workspace', 'Full Kitchen', 'Washer/Dryer'].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle size={16} className="text-green-600" /> {item}
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                Guest Reviews
                <span className="bg-slate-100 text-slate-600 text-xs py-1 px-2 rounded-full font-normal">
                  {reviews.length}
                </span>
              </h3>

              {loadingReviews ? (
                <div className="py-8 text-center text-slate-400">Loading reviews...</div>
              ) : reviews.length > 0 ? (
                <div className="space-y-2">
                  {reviews.map((review) => (
                    <PublicReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-500">
                  No reviews available for this property yet.
                </div>
              )}
            </div>

          </div>

          {/* --- RIGHT COLUMN (STICKY BOOKING CARD) --- */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                   <span className="text-2xl font-bold text-slate-900">£{property.price.toLocaleString()}</span>
                   <span className="text-slate-500 text-sm"> / month</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                   Min {property.nights} nights
                </div>
              </div>

              {/* Fake Date Picker Visual */}
              <div className="border border-slate-200 rounded-lg mb-4">
                <div className="grid grid-cols-2 border-b border-slate-200">
                  <div className="p-3 border-r border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Check-in</div>
                    <div className="text-sm font-medium">Add date</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Check-out</div>
                    <div className="text-sm font-medium">Add date</div>
                  </div>
                </div>
                <div className="p-3">
                   <div className="text-[10px] uppercase font-bold text-slate-500">Guests</div>
                   <div className="text-sm font-medium">1 guest</div>
                </div>
              </div>

              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-lg">
                Reserve
              </Button>

              <div className="mt-4 text-center text-xs text-slate-400">
                You won't be charged yet
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}