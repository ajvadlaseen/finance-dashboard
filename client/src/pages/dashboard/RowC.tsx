import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBox from '@/components/FlexBox'
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from '@/state/api'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts'

type Props = object

const RowC = (props: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 1200px)')
  const { palette, breakpoints } = useTheme()

  const pieColors = [palette.primary[500], palette.primary[900]]

  const { data: kpiData } = useGetKpisQuery()
  const { data: transactionData } = useGetTransactionsQuery()
  const { data: productData } = useGetProductsQuery()

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of total`,
              value: totalExpenses - value,
            },
          ]
        }
      )
    }
  }, [kpiData])

  const productColumns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (c: GridCellParams) => `₹${c.value}`,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (c: GridCellParams) => `₹${c.value}`,
    },
  ]
  const transactionColumns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.75,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.5,
      renderCell: (c: GridCellParams) => `₹${c.value}`,
    },
    {
      field: 'products',
      headerName: 'Products bought',
      flex: 0.5,
      renderCell: (c: GridCellParams) => (c.value as Array<string>).length,
    },
  ]

  return (
    <>
      <DashboardBox gridArea='g'>
        <BoxHeader
          title='List of Products'
          otherText={`${productData?.length} products`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height={'75%'}
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]}`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]}`,
            },
          }}
        >
          <DataGrid
            rows={productData || []}
            columns={productColumns}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='h'>
        <BoxHeader
          title='List of Transactions'
          otherText={`Last ${transactionData?.length} transactions`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height={'75%'}
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]}`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]}`,
            },
          }}
        >
          <DataGrid
            rows={transactionData || []}
            columns={transactionColumns}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='i'>
        <BoxHeader title='Expenses by Category' />
        <FlexBox
          m={'1.2rem'}
          // gap={'0.5rem'}
          p={'0 1rem'}
          textAlign={'center'}
          flexWrap={'wrap'}
        >
          {pieChartData?.map((data, i) => (
            <Box
              key={`${data[0].name}-${i}`}
              flexBasis={isLargeScreen ? '50%' : '10%'}
            >
              <PieChart width={110} height={110}>
                <Pie
                  data={data}
                  dataKey={'value'}
                  stroke='none'
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBox>
      </DashboardBox>
    </>
  )
}

export default RowC
