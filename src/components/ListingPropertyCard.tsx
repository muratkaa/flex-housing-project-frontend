import React from 'react';
import { Bed, Bath, Users, MapPin } from 'lucide-react';
import type { Property } from '@/data/properties';
import { useNavigate } from 'react-router-dom';

interface Props {
  property: Property;
}

export const ListingPropertyCard: React.FC<Props> = ({ property }) => {
    const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/properties/${property.id}`)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
    >

      {/* 1. IMAGE AREA */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* PRICE TAG  */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-right">
          <div className="text-slate-900 font-bold text-lg leading-none">
            £{property.price.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            for {property.nights} nights
          </div>
        </div>
      </div>

      {/* 2. CONTENT AREA */}
      <div className="p-5">

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1" title={property.title}>
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          {property.location}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-4"></div>

        {/* Specs (Bed, Bath, Guests) */}
        <div className="flex items-center justify-between text-slate-600 text-sm">
          <div className="flex items-center gap-1.5">
            <Bed size={16} className="text-slate-400" />
            <span>{property.bedrooms} <span className="hidden sm:inline">Bedrooms</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={16} className="text-slate-400" />
            <span>{property.bathrooms} <span className="hidden sm:inline">Bathroom</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-slate-400" />
            <span>Up to {property.guests}</span>
          </div>
        </div>
      </div>
    </div>
  );
};