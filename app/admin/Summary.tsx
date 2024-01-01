'use client'

import { Order, Product, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import Heading from '../components/products/Heading';
import { formatPrice } from '@/ultis/formatPrice';
import { formatNumber } from '@/ultis/formatNumber';

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[]
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  }
}

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: 'Total Sale',
      digit: 0
    },
    products: {
      label: 'Total Products',
      digit: 0
    },
    orders: {
      label: 'Total Orders',
      digit: 0
    },
    paidOrders: {
      label: 'Paid Orders',
      digit: 0
    },
    unpaidOrders: {
      label: 'Unpaid Orders',
      digit: 0
    },
    users: {
      label: 'Total User',
      digit: 0
    }
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = {...prev};

      const totalSale = orders.reduce((acc: number, item: any) => {
        if (item.status === 'complete') {
          return acc + item.amount
        } else {
          return acc;
        }
      }, 0)

      const paidOrders = orders.filter((orders) => {
        return orders.status === 'complete';
      })

      const unpaidOrders = orders.filter((orders) => {
        return orders.status === 'pending';
      })

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length
      tempData.paidOrders.digit = paidOrders.length
      tempData.unpaidOrders.digit = unpaidOrders.length
      tempData.products.digit = products.length
      tempData.users.digit = users.length

      return tempData;
    })
  }, [orders, products, users])

  const summaryKeys = Object.keys(summaryData)

  return (
    <div className='max-w-[150p0x] m-auto'>
      <div>
        <Heading title='Stats' center />
      </div>
      <div className='grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {
          summaryKeys && summaryKeys.map(key => {
            return <div key={key} className='rounded-xl border-2 flex flex-col items-center gap-2 transition'>
              <div className='text-xl md:text-4xl font-bold'>
                {
                  summaryData[key].label === 'Total Sale'
                  ? <>{formatPrice(summaryData[key].digit)}</>
                  : <>{formatNumber(summaryData[key].digit)}</>
                }
              </div>
              <div>{summaryData[key].label}</div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Summary;