import { View, Text, FlatList, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useMemo, useState } from 'react'

import { BoxTransaction } from '../components/BoxTransaction'
import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'
import { Heading } from '../components/Heading'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '../lib/api'
import { type Transaction } from '../contracts/transaction'
import { SelectMonth } from '../components/SelectMonth'

type OptimizationProps = {
  key: string
  render: () => JSX.Element
  isTitle?: boolean
}

type BillingAccount = {
  account_balance: number
  income: number
  expense: number
}

export function Home () {
  const [billingAccount, setBillingAccount] = useState<BillingAccount>({
    account_balance: 0,
    expense: 0,
    income: 0
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  // const dataForGraph = useMemo(() => {
  //   const data = transactions.map(transaction => ({
  //     x: transaction.category,
  //     y: transaction.value
  //   }))
  //   return data
  // }, [transactions])
  const { data, indices } = useMemo(() => {
    const data: OptimizationProps[] = [
      {
        key: 'HEADING_SPEND_FREQUENCY',
        render: () => <Heading title='Frequência de gastos' />
      },
      // {
      //   key: 'CHARTS',
      //   render: () => <Chart data={dataForGraph} withFilter />
      // },
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
  }, [transactions])
  async function handleAccountBilling () {
    const [billing, transaction] = await Promise.all([
      api.get('transactions/billing-details'),
      api.get('transactions')
    ])
    setBillingAccount(billing.data)
    setTransactions(transaction.data.transactions)
  }
  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#FFF6E5')
    StatusBar.setBarStyle('dark-content')
  })
  useEffect(() => {
    handleAccountBilling()
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
          <SelectMonth />
        </View>
        <Text className='text-sm font-inter-medium text-light-20 text-center'>
          Saldo da conta
        </Text>
        <Text className='text-dark-75 font-inter-semibold text-4xl text-center mt-2'>
          {(billingAccount.account_balance / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Text>
        <View className='mt-7 flex-row'>
          <BoxTransaction type='income' value={billingAccount.income / 100} />
          <View className='w-2' />
          <BoxTransaction type='expense' value={billingAccount.expense / 100} />
        </View>
      </LinearGradient>
      <FlatList<OptimizationProps>
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={indices}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    </View>
  )
}
