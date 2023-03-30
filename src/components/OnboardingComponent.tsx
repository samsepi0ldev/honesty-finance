import { View, Image, Text, useWindowDimensions } from 'react-native'

interface OnboardingComponentProps {
  data: {
    id: number
    title: string
    description: string
    image: any
  }
}

export function OnboardingComponent ({ data }: OnboardingComponentProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions()
  return (
    <View
      className='px-5 items-center my-auto'
      style={{ width: SCREEN_WIDTH }}
    >
      <Image source={data.image} className='mb-10' />
      <Text className='text-3xl text-dark-50 font-inter-bold text-center mb-4'>
        {data.title}
      </Text>
      <Text className='text-base text-light-20 font-inter-medium text-center'>
        {data.description}
      </Text>
    </View>
  )
}
