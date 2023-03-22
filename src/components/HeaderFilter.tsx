import { CaretDown, FunnelSimple } from 'phosphor-react-native'
import { TouchableOpacity, View, Text } from 'react-native'

export function HeaderFilter () {
  return (
    <View className='h-16 flex-row items-center justify-between px-4 py-2 bg-light-100'>
      <TouchableOpacity className='h-10 flex-row items-center justify-center pl-2 pr-4 border border-light-60 rounded-full'>
        <CaretDown size={24} weight='bold' color='#7F3DFF' />
        <Text className='font-inter-medium text-dark-50 text-sm ml-2'>Month</Text>
      </TouchableOpacity>
      <TouchableOpacity className='w-10 h-10 rounded-lg border border-light-60 items-center justify-center'>
        <FunnelSimple size={24} weight='bold' />
      </TouchableOpacity>
    </View>
  )
}
