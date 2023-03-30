import { View, Text, TouchableOpacity, TouchableHighlight, useWindowDimensions } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

import { OnboardingComponent } from '../components/OnboardingComponent'
import { Pagination } from '../components/Pagination'

import Illustration from '../assets/Illustration.png'
import Illustration1 from '../assets/Illustration-1.png'
import Illustration2 from '../assets/Illustration-2.png'

const data = [
  {
    id: 1,
    title: 'Obtenha controle total do seu dinheiro',
    description: 'Torne-se seu próprio gestor de dinheiro e faça valer cada centavo',
    image: Illustration2
  },
  {
    id: 2,
    title: 'Saiba onde seu dinheiro vai',
    description: 'Acompanhe sua transação facilmente, com categorias e relatório financeiro',
    image: Illustration1
  },
  {
    id: 3,
    title: 'Planejando à frente',
    description: 'Configure seu orçamento para cada categoria para que você esteja no controle',
    image: Illustration
  }
]

export function Onboarding () {
  const { navigate } = useNavigation()
  const { width: SCREEN_WIDTH } = useWindowDimensions()
  const x = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      x.value = e.contentOffset.x
    }
  })
  return (
    <View className='flex-1 bg-light-100'>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <OnboardingComponent data={item} />}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      <Pagination
        data={data}
        screenWidth={SCREEN_WIDTH}
        x={x}
      />
      <View className='w-full mt-auto mb-2 shrink-0 px-5'>
        <TouchableOpacity
          onPress={() => navigate('sign-up')}
          activeOpacity={0.7}
          className='mb-4 w-full h-14 items-center justify-center rounded-lg bg-violet-100'>
            <Text className='text-lg font-inter-semibold text-light-80'>Cadastrar-se</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={() => navigate('login')}
          underlayColor='#D3BDFF'
          className='w-full h-14 items-center justify-center rounded-lg bg-violet-20'>
          <Text className='text-lg font-inter-semibold text-violet-100'>Logar</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}
