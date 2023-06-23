import { Typography, useTheme } from '@mui/material'
import DeblurIcon from '@mui/icons-material/Deblur'
import FlexBox from './FlexBox'

const Navbar = () => {
  const { palette } = useTheme()
  return (
    <FlexBox mb={'0.25rem'} padding={'1rem 0rem'} color={palette.grey[300]}>
      <FlexBox gap={'0.75rem'}>
        <DeblurIcon sx={{ fontSize: '3rem' }} />
        <Typography variant='h4' fontSize={'2rem'}>
          FinDash
        </Typography>
      </FlexBox>
    </FlexBox>
  )
}

export default Navbar
