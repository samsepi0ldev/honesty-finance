import { useNavigation } from '@react-navigation/native'
import { TextInput, TouchableOpacity, View, Text } from 'react-native'

import { HeaderSimple } from '../components/HeaderSimple'

export function SignUp () {
  const { navigate } = useNavigation()
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple title='Cadastrar-se' backButton />
      <View className='mt-14 px-4'>
        <TextInput
          autoCorrect={false}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Nome'
          placeholderTextColor='#91919F'
        />
        <TextInput
          autoCorrect={false}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Email'
          placeholderTextColor='#91919F'
        />
        <TextInput
          autoCorrect={false}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Senha'
          secureTextEntry={true}
          placeholderTextColor='#91919F'
        />
        <TouchableOpacity
          activeOpacity={0.7}
          className='mt-10 w-full h-14 items-center justify-center rounded-lg bg-violet-100'>
          <Text className='text-lg font-inter-semibold text-light-80'>Cadastrar</Text>
        </TouchableOpacity>
        <View className='flex-row gap-1 items-center justify-center mt-8'>
          <Text className='text-base font-inter-medium text-light-20'>já tem uma conta?</Text>
          <Text className='text-base font-inter-medium text-violet-100 underline' onPress={() => navigate('login')}>Conecte-se</Text>
        </View>
      </View>
    </View>
  )
}
