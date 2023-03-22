import { CaretDown } from 'phosphor-react-native'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { BoxTransaction } from '../components/BoxTransaction'

export function Home () {
  return (
    <View className='bg-light-100 flex-1'>
      <LinearGradient
        colors={['#FFF6E5', 'transparent']}
        style={{
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        <View className='justify-center items-center h-16'>
          <View className='flex-row items-center'>
            <CaretDown size={24} color='#7F3DFF' />
            <Text className='text-sm font-inter-medium text-dark-50'>outubro</Text>
          </View>
        </View>
        <Text className='text-sm font-inter-medium text-light-20 text-center'>
          Saldo da conta
        </Text>
        <Text className='text-dark-75 font-inter-semibold text-4xl text-center mt-2'>
          $9,400.00
        </Text>
        <View className='mt-7 flex-row'>
          <BoxTransaction type='income' value={5000} />
          <View className='w-2' />
          <BoxTransaction type='expense' value={3200} />
        </View>
      </LinearGradient>
      <Text className='text-lg text-dark-100 font-inter-semibold leading-10 px-4'>
        Frequência de gastos
      </Text>
      <View>
        <View></View>
      </View>
    </View>
  )
}
