import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const SimpleLogo: React.FC = (props) => {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        Logo
      </Text>
    </Box>
  )
}

export default SimpleLogo
