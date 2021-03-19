import React from 'react'
import {
  useColorMode,
  Box,
  Image,
  AspectRatio,
  Badge,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react'
import Location from '../icons/Location'

import { BarCardProps } from '../types/global.types'

// import Voter from './Voter';

const BarCard: React.FC<BarCardProps> = ({
  name,
  address,
  deals,
  imageUrl,
}) => {
  const { colorMode } = useColorMode()
  const badge =
    deals.length === 1 ? `${deals.length} deal` : `${deals.length} deals`

  return (
    <Box
      borderWidth="1px"
      borderRadius={8}
      p={1}
      mb={2}
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <Flex>
        <AspectRatio w="100%" maxWidth="120px" ratio={1}>
          <Image src={imageUrl} alt={name} objectFit="cover" />
        </AspectRatio>
        <Stack ml={3} mt={2} mb={2}>
          <Flex align="baseline">
            <Badge variantColor="blue">{badge}</Badge>
          </Flex>
          <Box fontSize="xl" fontWeight="semibold" lineHeight="short">
            {name}
          </Box>
          <Flex align="center">
            <Location mr={1} w="16px" />
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
              {address}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  )
}

export default BarCard
