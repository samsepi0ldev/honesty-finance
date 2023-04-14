import { FunnelSimple } from 'phosphor-react-native'
import { TouchableOpacity, View } from 'react-native'
import { SelectMonth } from './SelectMonth'

export function HeaderFilter () {
  return (
    <View className='h-16 flex-row items-center justify-between px-4 py-2 bg-light-100'>
      <SelectMonth />
      <TouchableOpacity className='w-10 h-10 rounded-lg border border-light-60 items-center justify-center'>
        <FunnelSimple size={24} weight='bold' />
      </TouchableOpacity>
    </View>
  )
}
