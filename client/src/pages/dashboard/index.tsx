import { Box, useMediaQuery } from '@mui/material'
import RowA from './RowA'
import RowB from './RowB'
import RowC from './RowC'

const gridTemplateLargeScreen = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d g h"
  "i g h"
  "i g j"
  "i g j"

`
const gridTemplateSmallScreen = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "i"
  "i"
  "i"
  "g"
  "g"
  "g"
  "h"
  "h"
  "j"
  "j"
`

const Dashboard = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1200px)')
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'grid'}
      gap={'1.5rem'}
      sx={
        isLargeScreen
          ? {
              gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
              gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',
              gridTemplateAreas: gridTemplateLargeScreen,
            }
          : {
              gridAutoColumns: '1fr',
              gridAutoRows: '85px',
              gridTemplateAreas: gridTemplateSmallScreen,
            }
      }
    >
      <RowA />
      <RowB />
      <RowC />
    </Box>
  )
}

export default Dashboard
