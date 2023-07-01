import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const RowA = () => {
  const { palette } = useTheme()
  const { data } = useGetKpisQuery()
  // console.log('TCL: RowA -> data', data[0].monthlyData)

  const monthlyRevenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          month: month.substring(0, 3),
          revenue,
        }
      })
    )
  }, [data])

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

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          month: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        }
      })
    )
  }, [data])

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
              tickFormatter={(c) => `₹${c}`}
              // domain={[50000, 2500000]}
            />
            <Tooltip formatter={(c) => `₹${c}`} />
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
      <DashboardBox gridArea='b' padding={'5px 5px'}>
        <BoxHeader title='Profit & Revenue' />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={revenueProfit}
            margin={{
              top: 35,
              right: 15,
              left: 0,
              bottom: 35,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='month'
              tickLine={false}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId={'left'}
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={false}
              tickFormatter={(c) => `₹${c}`}
              // domain={[50000, 2500000]}
            />
            <YAxis
              yAxisId={'right'}
              orientation='right'
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={false}
              tickFormatter={(c) => `₹${c}`}
              // domain={[50000, 2500000]}
            />
            <Tooltip formatter={(c) => `₹${c}`} />
            <Legend height={20} wrapperStyle={{ margin: '5px 0 5px 0' }} />
            <Line
              yAxisId={'left'}
              type={'monotone'}
              dataKey={'profit'}
              stroke={palette.secondary[600]}
            />
            <Line
              yAxisId={'right'}
              type={'monotone'}
              dataKey={'revenue'}
              stroke={palette.primary[600]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea='c' padding={'5px 5px'}>
        <BoxHeader title='Revenue by Month' />
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={500}
            height={300}
            data={monthlyRevenue}
            margin={{
              top: 15,
              right: 12,
              left: 7,
              bottom: 18,
            }}
          >
            <defs>
              <linearGradient id='colorRevenue2' x1={0} y1={0} x2={0} y2={1}>
                <stop
                  offset='5%'
                  stop-color={palette.primary[600]}
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stop-color={palette.primary[600]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='month'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(c) => `₹${c}`}
            />
            <Tooltip formatter={(c) => `₹${c}`} />
            <Bar dataKey='revenue' fill='url(#colorRevenue2)' />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default RowA
