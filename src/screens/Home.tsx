import { CaretDown } from 'phosphor-react-native'
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useMemo } from 'react'

import { BoxTransaction } from '../components/BoxTransaction'
import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'
import { Heading } from '../components/Heading'
import { Chart } from '../components/Chart'
import { useFocusEffect } from '@react-navigation/native'

const transactions = [
  {
    id: '1',
    category: { name: 'Shopping' },
    wallet: { name: 'PicPay' },
    description: 'Comprei alguma coisa na mercearia',
    value: 32.50,
    type: 'expense',
    created_at: new Date('2023-02-07T04:31:42.376Z')
  },
  {
    id: '2',
    category: { name: 'Inscrição' },
    wallet: { name: 'PicPay' },
    description: 'Disney + plano anual',
    value: 55.90,
    type: 'expense',
    created_at: new Date('2023-02-07T12:47:31.571Z')
  },
  {
    id: '3',
    category: { name: 'Salario' },
    wallet: { name: 'PicPay' },
    description: 'Salario da assistência',
    value: 500,
    type: 'income',
    created_at: new Date('2023-02-07T03:14:17.955Z')
  },
  {
    id: '4',
    category: { name: 'Investimento' },
    wallet: { name: 'PicPay' },
    description: 'Investimento no PicPay',
    value: 1.75,
    type: 'income',
    created_at: new Date('2023-02-07T03:14:17.955Z')
  },
  {
    id: '5',
    category: { name: 'Serviço' },
    wallet: { name: 'PicPay' },
    description: 'Desbloqueio de celular',
    value: 15,
    type: 'income',
    created_at: new Date('2023-02-07T03:14:17.955Z')
  }
]

type OptimizationProps = {
  key: string
  render: () => JSX.Element
  isTitle?: boolean
}

export function Home () {
  const dataForGraph = transactions.map(transaction => ({
    x: transaction.category.name,
    y: transaction.value
  }))
  const { data, indices } = useMemo(() => {
    const data: OptimizationProps[] = [
      {
        key: 'HEADING_SPEND_FREQUENCY',
        render: () => <Heading title='Frequência de gastos' />
      },
      {
        key: 'CHARTS',
        render: () => <Chart data={dataForGraph} withFilter />
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
  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#FFF6E5')
    StatusBar.setBarStyle('dark-content')
  })
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
          <TouchableOpacity
            className='flex-row items-center border border-light-60 h-10 px-4 rounded-full'>
            <CaretDown size={24} color='#7F3DFF' />
            <Text className='text-sm font-inter-medium text-dark-50'>outubro</Text>
          </TouchableOpacity>
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
        scrollEventThrottle={16}
      />
    </View>
  )
}
