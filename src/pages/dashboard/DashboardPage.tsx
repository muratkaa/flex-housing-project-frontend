import { useEffect, useState } from 'react'
import { getReviews, syncReviews } from '@/services/api'
import type { Review, ReviewFilter } from '@/types'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function DashboardPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  // Filtre State'leri
  const [listingFilter, setListingFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState('0')
  const [channelFilter, setChannelFilter] = useState('all')

  const loadData = async () => {
    setLoading(true)
    try {
      const filters: ReviewFilter = {}
      if (listingFilter) filters.listingName = listingFilter
      if (ratingFilter !== '0') filters.minRating = Number(ratingFilter)
      if (channelFilter !== 'all') filters.channel = channelFilter

      const data = await getReviews(filters)
      setReviews(data)
    } catch (error) {
      console.error('Error loading reviews', error)
    } finally {
      setLoading(false)
    }
  }

  // Filtreler değiştikçe veriyi yeniden çek
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData()
    }, 500) // Debounce (Yazarken sürekli istek atmasın diye gecikme)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingFilter, ratingFilter, channelFilter])

  const handleSync = async () => {
    await syncReviews()
    loadData()
    alert('Data Synced!')
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reviews Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage guest reviews and visibility.
          </p>
        </div>
        <Button onClick={handleSync}>Sync Data</Button>
      </div>

      {/* Filtre Alanı */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search listing name..."
          value={listingFilter}
          onChange={(e) => setListingFilter(e.target.value)}
          className="max-w-sm"
        />

        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Min Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All Ratings</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
          </SelectContent>
        </Select>

        <Select value={channelFilter} onValueChange={setChannelFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="airbnb">Airbnb</SelectItem>
            <SelectItem value="booking.com">Booking.com</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <DataTable columns={columns} data={reviews} />
      )}
    </div>
  )
}
