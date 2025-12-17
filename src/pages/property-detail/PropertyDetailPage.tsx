import { PublicReviewCard } from '@/components/PublicReviewCard';
import { Button } from '@/components/ui/button';
import { PROPERTIES } from '@/data/properties';
import { getReviews } from '@/services/api';
import type { Review } from '@/types';
import { ArrowLeft, CheckCircle, Grid, MapPin, Star, Users, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
          const data = await getReviews({ listingName: property.title });
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

  const allImages = property.images || [];
  const mainImage = allImages[0];
  const subImages = allImages.slice(1, 5);

  return (
    <div className="min-h-screen bg-white pb-20">

      <div className="relative container mx-auto px-4 pt-6">

        <Link to="/properties" className="absolute top-8 left-6 z-20 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm hover:bg-white transition-colors md:hidden">
          <ArrowLeft size={20} className="text-slate-900" />
        </Link>

        {/* MAIN GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden h-auto md:h-[60vh] relative">

          {/* LEFT COL */}
          <div className="md:col-span-2 w-full h-[40vh] md:h-full relative group cursor-pointer">
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover hover:brightness-95 transition-all duration-500"
            />
          </div>

          {/* RIGHT COL*/}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-2 h-full">
            {/* Eğer 4'ten az resim varsa bile döngü çalışır, layout bozulmaz */}
            {subImages.map((img, index) => (
              <div key={index} className="relative group cursor-pointer w-full h-full">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:brightness-95 transition-all duration-500"
                />
              </div>
            ))}
          </div>

          <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors z-10">
            <Grid size={16} />
            <span className="hidden sm:inline">Show all photos</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="container mx-auto px-4 mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2">

            <div className="border-b border-slate-200 pb-8 mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-slate-900 font-medium text-sm">
                  <MapPin size={16} className="mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center gap-1">
                   <Star size={16} className="fill-slate-900 text-slate-900" />
                   <span className="font-semibold text-base">{property.rating}</span>
                   <span className="text-slate-400 mx-1">·</span>
                   <span className="underline font-medium text-slate-900">{reviews.length} reviews</span>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-8 mb-8">
               <div className="flex gap-6 text-slate-900">
                  <div className="flex flex-col">
                     <span className="font-semibold text-base">Entire rental unit</span>
                     <span className="text-slate-500 text-sm">
                        {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} baths
                     </span>
                  </div>
               </div>
            </div>

            {/* Icons */}
            <div className="border-b border-slate-200 pb-8 mb-8 space-y-6">
                <div className="flex gap-4 items-start">
                   <Users size={24} className="text-slate-700 mt-0.5" />
                   <div>
                      <h3 className="font-semibold text-slate-900">Great for groups</h3>
                      <p className="text-slate-500 text-sm">Spacious layout for up to {property.guests} people.</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <Wifi size={24} className="text-slate-700 mt-0.5" />
                   <div>
                      <h3 className="font-semibold text-slate-900">Fast Wi-Fi</h3>
                      <p className="text-slate-500 text-sm">Rated at 250 Mbps, perfect for remote work.</p>
                   </div>
                </div>
            </div>

            {/* Description */}
            <div className="border-b border-slate-200 pb-8 mb-8">
              <h3 className="font-bold text-xl text-slate-900 mb-4">About this space</h3>
              <p className="text-slate-600 leading-relaxed">
                Experience the best of London in this stunning {property.title}.
                Centrally located in {property.location}, this apartment offers modern amenities,
                high-speed Wi-Fi, and a fully equipped kitchen.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="border-b border-slate-200 pb-8 mb-8">
               <h3 className="font-bold text-xl text-slate-900 mb-6">What this place offers</h3>
               <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {['Fast Wi-Fi', 'Smart TV', 'Coffee Maker', 'Workspace', 'Full Kitchen', 'Washer/Dryer'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle size={18} className="text-slate-900" />
                      <span className="text-sm md:text-base">{item}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* REVIEWS */}
            <div className="py-4">
              <h3 className="font-bold text-xl text-slate-900 mb-8 flex items-center gap-2">
                <Star size={20} className="fill-slate-900" />
                {property.rating} · {reviews.length} reviews
              </h3>

              {loadingReviews ? (
                <div className="py-8 text-center text-slate-400">Loading reviews...</div>
              ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reviews.map((review) => (
                    <PublicReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-500">
                  No reviews yet.
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN (Sticky Card) --- */}
          <div className="hidden lg:block relative">
            <div className="sticky top-28 bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-slate-200 p-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                   <span className="text-2xl font-bold text-slate-900">£{property.price.toLocaleString()}</span>
                   <span className="text-slate-500 text-sm"> / month</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                   <Star size={14} className="fill-slate-900" />
                   {property.rating}
                </div>
              </div>

              <div className="border border-slate-400 rounded-lg mb-4 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-slate-400">
                  <div className="p-3 border-r border-slate-400 cursor-pointer hover:bg-slate-50">
                    <div className="text-[10px] uppercase font-bold text-slate-800">Check-in</div>
                    <div className="text-sm text-slate-500">Add date</div>
                  </div>
                  <div className="p-3 cursor-pointer hover:bg-slate-50">
                    <div className="text-[10px] uppercase font-bold text-slate-800">Check-out</div>
                    <div className="text-sm text-slate-500">Add date</div>
                  </div>
                </div>
                <div className="p-3 cursor-pointer hover:bg-slate-50">
                   <div className="text-[10px] uppercase font-bold text-slate-800">Guests</div>
                   <div className="text-sm text-slate-900">1 guest</div>
                </div>
              </div>

              <Button className="w-full bg-[#FF385C] hover:bg-[#D90B3E] text-white h-12 text-lg font-semibold rounded-lg transition-colors">
                Reserve
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}