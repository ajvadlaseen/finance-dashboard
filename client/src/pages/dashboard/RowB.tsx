import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'

const RowB = () => {
  const { palette } = useTheme()
  const pieColors = [palette.primary[600], palette.grey[600]]

  const { data: productData } = useGetProductsQuery()
  const { data: operationalData } = useGetKpisQuery()
  // console.log('TCL: RowB -> data', data)

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            month: month.substring(0, 3),
            operationalExpenses,
            nonOperationalExpenses,
          }
        }
      )
    )
  }, [operationalData])

  const ProductExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price,
          expense,
        }
      })
    )
  }, [productData])

  const totalExpenses = useMemo(() => {
    let totalOperational = 0
    let totalNonOperational = 0

    operationalData &&
      operationalData[0].monthlyData.map(
        ({ operationalExpenses, nonOperationalExpenses }) => {
          totalOperational += operationalExpenses
          totalNonOperational += nonOperationalExpenses
        }
      )

    return [
      {
        name: 'Operational',
        value: totalOperational,
      },
      {
        name: 'Non Operational',
        value: totalNonOperational,
      },
    ]
  }, [operationalData])

  // console.log('TCL: ', totalExpenses)
  return (
    <>
      <DashboardBox gridArea='d' padding={'5px 5px'}>
        <BoxHeader title='Operational vs Non Operational Expenses' />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 35,
              right: -5,
              left: -10,
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
              orientation='left'
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
            <Line
              yAxisId={'left'}
              type={'monotone'}
              dataKey={'nonOperationalExpenses'}
              stroke={palette.grey[600]}
            />
            <Line
              yAxisId={'right'}
              type={'monotone'}
              dataKey={'operationalExpenses'}
              stroke={palette.primary[600]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea='e'>
        <BoxHeader title='Total Expenses' />
        <PieChart
          width={430}
          height={110}
          margin={{
            top: 100,
            right: 0,
            bottom: 10,
            left: 0,
          }}
        >
          <Pie
            dataKey={'value'}
            startAngle={180}
            endAngle={0}
            data={totalExpenses}
            cx='50%'
            cy='50%'
            outerRadius={55}
            stroke='none'
            label={({ value, percent }) =>
              `₹${value} (${(percent * 100).toFixed(2)}%)`
            }
            // data={pieData}
            // innerRadius={18}
            // outerRadius={38}
            // paddingAngle={2}
            // dataKey='value'
          >
            {totalExpenses.map((_, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
          <Legend
            height={20}
            wrapperStyle={{ margin: '0px auto -15px auto' }}
          />
        </PieChart>
      </DashboardBox>
      <DashboardBox gridArea='f'>
        <BoxHeader title='Product Prices vs Expenses' />
        <ResponsiveContainer width='100%' height={'100%'}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type='number'
              dataKey='price'
              name='price'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(c) => `₹${c}`}
            />
            <YAxis
              type='number'
              dataKey='expense'
              name='expense'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(c) => `₹${c}`}
            />
            <ZAxis type='number' range={[20]} />
            <Tooltip formatter={(c) => `₹${c}`} />
            <Scatter
              name='Product Expense Ratio'
              data={ProductExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default RowB
