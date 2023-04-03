import { CaretRight } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HeaderSimple } from '../components/HeaderSimple'

interface ButtonMenuProps {
  title: string
}

function ButtonMenu ({ title }: ButtonMenuProps) {
  return (
    <TouchableOpacity className='w-full h-14 items-center justify-between flex-row p-4'>
      <Text className='text-base font-inter-medium text-dark-25'>{title}</Text>
      <CaretRight size={16} weight='bold' color='#7F3DFF' />
    </TouchableOpacity>
  )
}

export function Config () {
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple className='border-b border-dark-100/5' title='Configurações' backButton />
      <ButtonMenu title='Segurança' />
      <ButtonMenu title='Sobre' />
      <ButtonMenu title='Ajuda' />
    </View>
  )
}
