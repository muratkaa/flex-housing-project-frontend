import type { ColumnDef } from '@tanstack/react-table'
import type { Review } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { updateReviewVisibility } from '@/services/api'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const renderStars = (rating: number) => {
  return (
    <div className="flex text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
      ))}
      <span className="ml-2 text-xs font-medium text-slate-500">
        {Number(rating).toFixed(1)}
      </span>
    </div>
  )
}

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: 'listingName',
    header: 'Listing',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('listingName')}</div>
    ),
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => renderStars(row.getValue('rating')),
  },
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => {
      const channel = row.getValue('channel') as string
      const color =
        channel === 'airbnb'
          ? 'bg-red-100 text-red-800'
          : channel === 'booking.com'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-slate-100 text-slate-800'
      return <Badge className={color}>{channel}</Badge>
    },
  },
  {
    accessorKey: 'content',
    header: 'Review',
    cell: ({ row }) => {
      const text = row.getValue('content') as string
      return (
        <div className="max-w-[300px] truncate" title={text}>
          {text}
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleDateString()
    },
  },
  // --- GÜNCELLENEN KISIM: SWITCH MANTIĞI ---
  {
    accessorKey: 'isVisible',
    header: 'Public?',
    cell: ({ row }) => {
      const review = row.original
      // Local state kullanarak anında tepki veriyoruz (Optimistic UI)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isVisible, setIsVisible] = useState(review.isVisible)

      const handleToggle = async (checked: boolean) => {
        // 1. UI'ı hemen güncelle (Kullanıcı beklemesin)
        setIsVisible(checked)

        try {
          // 2. Arka planda API'ye haber ver
          await updateReviewVisibility(review.id, checked)
        } catch (error) {
          // 3. Hata olursa UI'ı geri al
          console.error('Failed to update visibility', error)
          setIsVisible(!checked)
          alert('Güncelleme başarısız!')
        }
      }

      return <Switch checked={isVisible} onCheckedChange={handleToggle} />
    },
  },
]
