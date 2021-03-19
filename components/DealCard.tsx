import { useColorMode, Box, Badge, Text, Flex, Stack } from '@chakra-ui/react'
import { AlcoholType } from '../types/global.types'

// import Voter from './Voter';
const badgeColors = {
  BEER: 'teal',
  WINE: 'red',
  LIQUOR: 'blue',
  FOOD: 'orange',
}

export type DealCardProps = {
  id: string
  daysActive: Date[]
  location: number[]
  score: number
  userDeals: string
  description: string
  alcoholType: AlcoholType
}

const DealCard: React.FC<DealCardProps> = ({
  daysActive,
  location,
  description,
  alcoholType,
}) => {
  const { colorMode } = useColorMode()
  const start = daysActive[0]
  const end = daysActive[1]

  return (
    <Box
      borderWidth="1px"
      borderRadius={8}
      p={1}
      mb={2}
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <Flex>
        <Stack ml={3} mt={2} mb={2} w="100%" pr={4}>
          <Flex align="baseline">
            <Badge variantColor={badgeColors[alcoholType]}>{alcoholType}</Badge>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
              {description}
            </Text>
            <Badge variantColor="grey">{`${start} - ${end}`}</Badge>
          </Flex>
          <Text color="gray.400">
            {location[0]}, {location[1]}
          </Text>
        </Stack>
      </Flex>
    </Box>
  )
}

export default DealCard
