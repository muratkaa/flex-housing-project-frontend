import { ListingPropertyCard } from '@/components/ListingPropertyCard';
import { PROPERTIES } from '@/data/properties';

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER / HERO SECTION */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-slate-900 flex items-center gap-2">
            🏡 Flex Living <span className="text-slate-400 font-normal text-sm">| London Stays</span>
          </div>
          <div className="text-sm text-slate-500">
            {PROPERTIES.length} properties found
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-8">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Available Properties</h1>
          <p className="text-slate-500 mt-1">
            Explore our curated selection of premium apartments in London.
          </p>
        </div>

        {/* GRID LAYOUT (Analitik sayfasıyla aynı mantık) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {PROPERTIES.map((property) => (
            <ListingPropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>
    </div>
  );
}