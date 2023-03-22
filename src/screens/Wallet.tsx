import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import { Wallet as WalletIcon } from 'phosphor-react-native'

import { HeaderSimple } from '../components/HeaderSimple'
import bgImage from '../assets/BG.png'

const wallets = [
  {
    name: 'Carteira',
    value: 1400
  },
  {
    name: 'Banco',
    value: 2800
  },
  {
    name: 'Caixa 1',
    value: 400
  },
  {
    name: 'Caixa 2',
    value: 700
  }
]

export function Wallet () {
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple
        className='bg-light-100'
        title='Carteiras'
        backButton
      />
      <View className='h-52 mt-2.5'>
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        className='flex-1 justify-center items-center'
      >
        <Text className='text-sm text-light-20 font-inter-medium'>Saldo da conta</Text>
        <Text className='text-dark-75 font-inter-semibold text-4xl text-center mt-2'>
          $9,400.00
        </Text>
      </ImageBackground>
      </View>
      <View className='flex-1 mt-5'>
        {wallets.map((wallet, index) => (
          <TouchableOpacity
            key={index}
            className='h-20 flex-row items-center justify-between p-4 border-b border-dark-100/10'
            activeOpacity={0.7}
          >
            <View className='flex-row items-center'>
              <View className='w-12 h-12 rounded-2xl bg-violet-20 items-center justify-center mr-2'>
                <WalletIcon size={32} weight='fill' color='#7F3DFF' />
              </View>
              <Text className='text-lg font-inter-semibold text-dark-50'>
                {wallet.name}
              </Text>
            </View>
            <Text className='text-lg font-inter-semibold text-dark-50'>
              {wallet.value}
            </Text>
          </TouchableOpacity>
        ))}
        <View className='px-4 mt-auto mb-4'>
          <TouchableOpacity
            activeOpacity={0.7}
            className='w-full items-center justify-center rounded-2xl bg-violet-100 py-4'
          >
            <Text className='text-light-80 text-lg font-inter-semibold'>+ Adicionar nova carteira</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
