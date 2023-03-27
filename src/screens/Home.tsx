import { CaretDown } from 'phosphor-react-native'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { BoxTransaction } from '../components/BoxTransaction'
import { BoxIncomeExpanse } from '../components/BoxIcomeExpanse'
import { Heading } from '../components/Heading'

const transactions = [
  {
    category: { name: 'Shopping' },
    description: 'Comprei alguma coisa na mercearia',
    price: -32.50,
    created_at: new Date('2023-02-07T04:31:42.376Z')
  },
  {
    category: { name: 'Inscrição' },
    description: 'Disney + plano anual',
    price: -55.90,
    created_at: new Date('2023-02-07T12:47:31.571Z')
  },
  {
    category: { name: 'Salario' },
    description: 'Salario da assistência',
    price: 500,
    created_at: new Date('2023-02-07T03:14:17.955Z')
  }
]

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
          <BoxTransaction type='expense' value={1200} />
        </View>
      </LinearGradient>
      <Heading title='Frequência de gastos' />
      <View>
        <View></View>
      </View>
      <Heading title='Transações recentes' />
      <View className='px-4'>
        {transactions.map(transaction => (
          <BoxIncomeExpanse key={transaction.description} data={transaction} />
        ))}
      </View>
    </View>
  )
}
