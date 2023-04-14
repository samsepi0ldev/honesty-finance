import { View, Text } from 'react-native'

interface AvatarProps {
  name?: string
}

export function Avatar ({ name }: AvatarProps) {
  const nameArr = name?.split(' ') ?? ['', '']
  const nameView = nameArr[0].charAt(0) + nameArr[1].charAt(0)
  return (
    <View className='w-20 h-20 rounded-full bg-violet-100 items-center justify-center'>
      <Text className='text-4xl font-inter-medium text-light-80'>{nameView}</Text>
    </View>
  )
}
