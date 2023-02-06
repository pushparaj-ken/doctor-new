import React from 'react'
import { Box, Typography } from '@mui/material'

export function PageNotFound() {
  return (
    <Box sx={{ height: '80vh', textAlign: 'center' }}>
      <Typography variant="h4" color="initial" sx={{ pt: 4 }}>
        404 Page NOt Found
      </Typography>
    </Box>
  )
}