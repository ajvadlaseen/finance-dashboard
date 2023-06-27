import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Props = object

const RowA = (props: Props) => {
  const { palette } = useTheme()
  const { data } = useGetKpisQuery()
  // console.log('TCL: RowA -> data', data[0].monthlyData)

  const monthlyRevenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          month: month.substring(0, 3),
          revenue,
          expenses,
        }
      })
    )
  }, [data])

  const percentage = useMemo(() => {
    const finalTwo = monthlyRevenueExpenses?.slice(-2)
    let percentage = 0

    if (finalTwo) {
      const lastRevenueExpenseDifference =
        finalTwo[1].revenue - finalTwo[1].expenses
      const secondLastRevenueExpenseDifference =
        finalTwo[0].revenue - finalTwo[0].expenses

      percentage =
        ((lastRevenueExpenseDifference - secondLastRevenueExpenseDifference) /
          secondLastRevenueExpenseDifference) *
        100
    }
    return percentage.toFixed(2)
  }, [monthlyRevenueExpenses])

  return (
    <>
      <DashboardBox gridArea='a' padding={'5px 5px'}>
        <BoxHeader
          title='Revenue & Expenses'
          subtitle='Dark: Revenue, Light: Expenses'
          otherText={`${percentage}%`}
        />
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={monthlyRevenueExpenses}
            margin={{
              top: 35,
              right: 35,
              left: 0,
              bottom: 35,
            }}
          >
            <defs>
              <linearGradient id='colorRevenue' x1={0} y1={0} x2={0} y2={1}>
                <stop
                  offset='5%'
                  stop-color={palette.primary[700]}
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stop-color={palette.primary[700]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='colorExpenses' x1={0} y1={0} x2={0} y2={1}>
                <stop
                  offset='5%'
                  stop-color={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stop-color={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='month'
              tickLine={false}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={{ strokeWidth: '0' }}
              // domain={[50000, 2500000]}
            />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='revenue'
              stroke={palette.primary.main}
              fill='url(#colorRevenue)'
              dot={true}
              fillOpacity={1}
            />
            <Area
              type='monotone'
              dataKey='expenses'
              stroke={palette.primary.main}
              fill='url(#colorExpenses)'
              dot={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea='b'></DashboardBox>
      <DashboardBox gridArea='c'></DashboardBox>
    </>
  )
}

export default RowA
