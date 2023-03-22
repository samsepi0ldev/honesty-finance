import { View, Text } from 'react-native'

import IncomeIcon from '../assets/Income.svg'
import ExpenseIcon from '../assets/Expense.svg'
import clsx from 'clsx'

interface BoxTransactionProps {
  value: number
  type: 'income' | 'expense'
}

export function BoxTransaction ({ type, value }: BoxTransactionProps) {
  return (
    <View className={clsx('w-ful flex-row p-4 rounded-3xl flex-1', {
      'bg-green-100': type === 'income',
      'bg-red-100': type === 'expense'
    })}>
      <View className='bg-light-80 w-12 h-12 items-center justify-center rounded-2xl'>
        {type === 'income' ? <IncomeIcon width={32} /> : <ExpenseIcon width={32} />}
      </View>
      <View className='ml-2.5'>
        <Text className='text-sm font-inter-medium text-light-80'>
          {type === 'income' ? 'Renda' : 'Despesas'}
        </Text>
        <Text className='text-lg font-inter-semibold text-light-80'>
          {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Text>
      </View>
    </View>
  )
}
