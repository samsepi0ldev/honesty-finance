import { useNavigation } from '@react-navigation/native'
import { CaretRight } from 'phosphor-react-native'
import { View, Text, TouchableHighlight, ScrollView } from 'react-native'
import { BoxIncomeExpanse } from '../components/BoxIcomeExpanse'
import { HeaderFilter } from '../components/HeaderFilter'
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
  }
]

export function Transactions () {
  const { navigate } = useNavigation()
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderFilter />
      <TouchableHighlight
        underlayColor='#D3BDFF'
        onPress={() => navigate('financial-report')}
        className='mx-4 my-2 bg-violet-20 px-4 flex-row items-center justify-between h-12 rounded-lg'>
        <>
        <Text className='text-base font-inter-regular text-violet-100'>Veja seu relatório financeiro</Text>
        <CaretRight size={24} weight='bold' color='#7F3DFF' />
        </>
      </TouchableHighlight>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Heading title='Hoje' />
        {transactions.map((transaction, i) => (
          <BoxIncomeExpanse key={i} data={transaction} />
        ))}
        <Heading title='Ontem' />
        {transactions.map((transaction, i) => (
          <BoxIncomeExpanse key={i} data={transaction} />
        ))}
      </ScrollView>
    </View>
  )
}
