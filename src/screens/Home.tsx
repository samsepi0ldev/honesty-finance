import { CaretDown } from 'phosphor-react-native'
import { View, Text, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { BoxTransaction } from '../components/BoxTransaction'
import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'
import { Heading } from '../components/Heading'
import { useMemo } from 'react'

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
  },
  {
    category: { name: 'Investimento' },
    description: 'Investimento no PicPay',
    price: 1.75,
    created_at: new Date('2023-02-07T03:14:17.955Z')
  },
  {
    category: { name: 'Serviço' },
    description: 'Desbloqueio de celular',
    price: 15,
    created_at: new Date('2023-02-07T03:14:17.955Z')
  }
]
type OptimizationProps = {
  key: string
  render: () => JSX.Element
  isTitle?: boolean
}

export function Home () {
  const { data, indices } = useMemo(() => {
    const data: OptimizationProps[] = [
      {
        key: 'HEADING_SPEND_FREQUENCY',
        render: () => <Heading title='Frequência de gastos' />
      },
      {
        key: 'HEADING_RECENT_TRANSLATIONS',
        render: () => <Heading title='Transações recentes' />,
        isTitle: true
      },
      {
        key: 'RECENT_TRANSLATIONS_COMPONENTS',
        render: () => <View className='px-4'>
          {transactions.map((transaction, i) => <BoxIncomeExpanse key={i} data={transaction} />)}
        </View>
      }
    ]
    const indices = data.filter(item => !item.isTitle).map((_, i) => i)
    return { data, indices }
  }, [])
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
          <View className='flex-row items-center border border-light-60 h-10 px-4 rounded-full'>
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
      <FlatList<OptimizationProps>
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={indices}
      />
    </View>
  )
}
