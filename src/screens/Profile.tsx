import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { PencilSimple, Wallet, GearSix, UploadSimple, SignOut } from 'phosphor-react-native'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { useAuth } from '../context/auth'
import { Avatar } from '../components/Avatar'

export function Profile () {
  const { navigate } = useNavigation()
  const { logout, user } = useAuth()

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#F6F6F6')
    StatusBar.setBarStyle('dark-content')
  })
  return (
    <View className='flex-1 p-5 bg-background-100'>
      <View className='flex-row items-center justify-between mt-8'>
        <View className='flex-row items-center'>
          <View className='w-[92px] h-[92px] border-2 border-violet-100 rounded-full items-center justify-center'>
            <View className='w-[88px] h-[88px] border-4 border-light-100 rounded-full items-center justify-center'>
              <Avatar name={user?.name} />
            </View>
          </View>
          <View className='ml-5'>
            <Text className='text-sm font-inter-medium text-light-20'>Usuário</Text>
            <Text className='text-2xl font-inter-semibold text-dark-75'>{user?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          className='w-10 h-10 items-center justify-center'>
          <PencilSimple weight='bold' size={32} />
        </TouchableOpacity>
      </View>
      <View className='bg-light-100 mt-10 rounded-3xl overflow-hidden'>
        <TouchableOpacity
          onPress={() => navigate('wallet')}
          activeOpacity={0.6}
          className='px-4 py-3.5 flex-row items-center border-b border-dark-100/10'>
          <View className='w-14 h-14 items-center justify-center bg-violet-20 rounded-2xl mr-2'>
            <Wallet size={32} weight='fill' color='#7F3DFF' />
          </View>
          <Text className='text-base font-inter-medium text-dark-25'>Carteira</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigate('config')}
          className='px-4 py-3.5 flex-row items-center border-b border-dark-100/10'>
          <View className='w-14 h-14 items-center justify-center bg-violet-20 rounded-2xl mr-2'>
            <GearSix size={32} weight='fill' color='#7F3DFF' />
          </View>
          <Text className='text-base font-inter-medium text-dark-25'>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          className='px-4 py-3.5 flex-row items-center border-b border-dark-100/10'>
          <View className='w-14 h-14 items-center justify-center bg-violet-20 rounded-2xl mr-2'>
            <UploadSimple size={32} weight='fill' color='#7F3DFF' />
          </View>
          <Text className='text-base font-inter-medium text-dark-25'>Exportar dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={async () => {
            await logout()
            navigate('onboarding')
          }}
          className='px-4 py-3.5 flex-row items-center'>
          <View className='w-14 h-14 items-center justify-center bg-red-20 rounded-2xl mr-2'>
            <SignOut size={32} weight='fill' color='#FD3C4A' />
          </View>
          <Text className='text-base font-inter-medium text-dark-25'>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
