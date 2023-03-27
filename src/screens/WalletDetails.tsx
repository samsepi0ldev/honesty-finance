import { View, Text, ScrollView } from 'react-native'
import { BoxIncomeExpanse } from '../components/BoxIcomeExpanse'

import { HeaderSimple } from '../components/HeaderSimple'
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
    category: { name: 'Comida' },
    description: 'Comprei um pastel',
    price: -8.50,
    created_at: new Date('2023-02-07T20:03:52.811Z')
  },
  {
    category: { name: 'Salario' },
    description: 'Salario da assistência',
    price: 500,
    created_at: new Date('2023-02-07T03:14:17.955Z')
  },
  {
    category: { name: 'Transporte' },
    description: 'Uber para casa',
    price: -18,
    created_at: new Date('2023-02-07T21:58:08.247Z')
  },
  {
    category: { name: 'Investimentos' },
    description: 'Picpay investimentos',
    price: 4000,
    created_at: new Date('2023-02-07T16:58:25.247Z')
  }
]

export function WalletDetails () {
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple
        title='Detalhes da carteira'
        backButton
      />
      <View className='items-center justify-center gap-2 mt-8'>
        <View className='bg-light-60 w-12 h-12 rounded-2xl' />
        <Text className='text-2xl font-inter-semibold text-dark-75'>Paypal</Text>
        <Text className='text-3xl font-inter-bold text-dark-50'>$2400</Text>
      </View>
      <ScrollView className='mt-12' showsVerticalScrollIndicator={false}>
        <Heading title='Hoje' />
        <View className='px-5'>
          {transactions.map((transaction, i) => (
            <BoxIncomeExpanse key={i} data={transaction} />
          ))}
        </View>
        <Heading title='Ontem' />
        <View className='px-5'>
        {transactions.map((transaction, i) => (
            <BoxIncomeExpanse key={i} data={transaction} />
        ))}
        </View>
      </ScrollView>
    </View>
  )
}
