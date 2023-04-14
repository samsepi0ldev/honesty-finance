import { Text, View } from 'react-native'

type CategoryBillingTransactions = {
  category: string
  balance_category: number
  percent_billing: number
}

interface CategoryBillingProps {
  data: CategoryBillingTransactions
}

const settingsCategories = [
  {
    label: 'Shopping',
    color: 'bg-yellow-100'
  },
  {
    label: 'Inscrição',
    color: 'bg-violet-100'
  },
  {
    label: 'Comida',
    color: 'bg-red-100'
  },
  {
    label: 'Salario',
    color: 'bg-green-100'
  },
  {
    label: 'Deposito',
    color: 'bg-green-100'
  },
  {
    label: 'Transporte',
    color: 'bg-blue-100'
  },
  {
    label: 'Investimentos',
    color: 'bg-violet-100'
  }
]

export function CategoryBilling ({ data }: CategoryBillingProps) {
  const setting = settingsCategories.find(obj => obj.label.toLowerCase().includes(data.category.toLowerCase()))
  return (
    <View className='w-full items-start justify-center mt-4 p-4 bg-light-100 rounded-2xl border border-light-60'>
      <View className='p-2 flex-row items-center justify-center bg-light-80 border border-light-60 rounded-full'>
        <View className={`w-3.5 h-3.5 rounded-full mr-2 ${setting?.color as string}`} />
        <Text className='text-sm font-inter-medium text-dark-50'>{data.category}</Text>
      </View>
      <Text className='text-2xl font-inter-semibold text-dark-100 mt-2'>
        Montante: {
          (data.balance_category / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
      </Text>
      <View className='w-full bg-light-60 h-3 rounded-full mt-2'>
        <View
          style={{
            width: `${data.percent_billing}%`
          }}
          className={`h-full rounded-full ${setting?.color as string}`}
        />
      </View>
      <Text className='text-sm font-inter-regular text-red-100 mt-2'>Essa categoria faz parte de {data.percent_billing}% do faturamento!</Text>
    </View>
  )
}
