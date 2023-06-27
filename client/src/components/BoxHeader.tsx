import React from 'react'
import FlexBox from './FlexBox'
import { Box, Typography, useTheme } from '@mui/material'

type Props = {
  title: string
  icon?: React.ReactNode
  subtitle?: string
  otherText?: string
}

const BoxHeader = ({ icon, title, subtitle, otherText }: Props) => {
  const { palette } = useTheme()
  return (
    <FlexBox color={palette.grey[400]} margin='0.5rem 1rem 0 1rem'>
      <FlexBox>
        {icon}
        <Box width={'100%'}>
          <Typography variant='h4' mb='-0.1rem'>
            {title}
          </Typography>
          <Typography variant='h6' mb='-0.1rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBox>
      <Typography
        variant='h5'
        fontWeight={'700'}
        color={palette.secondary[300]}
      >
        {otherText}
      </Typography>
    </FlexBox>
  )
}

export default BoxHeader
