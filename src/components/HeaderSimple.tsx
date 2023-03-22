import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'

interface HeaderSimpleProps {
  title: string
  backButton?: boolean
  light?: boolean
}

function Header ({ title, backButton, ...rest }: HeaderSimpleProps) {
  const { goBack } = useNavigation()
  return (
      <View className='flex-row items-center justify-between h-16 p-4' {...rest}>
        {backButton
          ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={goBack}
            >
              <ArrowLeft color='#464A4D' size={32} />
            </TouchableOpacity>
            )
          : <View className='w-8 h-8' />}
        <Text className='text-lg font-inter-semibold text-dark-50'>{title}</Text>
        <View className='w-8 h-8' />
      </View>
  )
}

export const HeaderSimple = styled(Header)
