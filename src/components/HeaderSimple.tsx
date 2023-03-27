import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'
import clsx from 'clsx'

interface HeaderSimpleProps {
  title: string
  backButton?: boolean
  light?: boolean
}

function Header ({ title, backButton, light, ...rest }: HeaderSimpleProps) {
  const { goBack } = useNavigation()
  return (
      <View className='flex-row items-center justify-between h-16 p-4' {...rest}>
        {backButton
          ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={goBack}
              className='w-12 h-12 items-center justify-center'
            >
              <ArrowLeft color={ light ? '#fff' : '#212325'} size={32} />
            </TouchableOpacity>
            )
          : <View className='w-12 h-12' />}
        <Text className={clsx('text-lg font-inter-semibold', {
          'text-dark-50': !light,
          'text-light-100': light
        })}>{title}</Text>
        <View className='w-12 h-12' />
      </View>
  )
}

export const HeaderSimple = styled(Header)
