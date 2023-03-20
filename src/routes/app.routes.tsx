import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import { Coins, HouseSimple, PlusCircle, Tag, User } from 'phosphor-react-native'

const Tab = createBottomTabNavigator()

function Home () {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

function Transaction () {
  return (
    <View className='flex-1 bg-white'>
      <Text>Transaction</Text>
    </View>
  )
}

function Profile () {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

function NewTransaction () {
  return (
    <View>
      <Text>NewTransaction</Text>
    </View>
  )
}

function Category () {
  return (
    <View>
      <Text>Category</Text>
    </View>
  )
}

export function AppRoutes () {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7F3DFF',
        tabBarInactiveTintColor: '#C6C6C6',
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 10
        },
        tabBarStyle: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 70,
          borderRadius: 16,
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowRadius: 0,
          shadowOpacity: 0
        }

      }}

    >
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <HouseSimple
              size={24}
              color={color}
              weight={focused ? 'fill' : 'regular'}
            />
          )
        }}
      />
      <Tab.Screen
        name='transaction'
        component={Transaction}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Traslações',
          tabBarIcon: ({ color, focused }) => (
            <Coins
              size={24}
              color={color}
              weight={focused ? 'fill' : 'regular'}
            />
          )
        }}
      />
      <Tab.Screen
        name='new'
        component={NewTransaction}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -10
          },
          title: '',
          tabBarIcon: () => (
            <View className='bg-slate-100 rounded-full'>
              <PlusCircle
              size={70}
              color='#7F3DFF'
              weight='fill'
            />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='category'
        component={Category}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Categorias',
          tabBarIcon: ({ color, focused }) => (
            <Tag
              size={24}
              color={color}
              weight={focused ? 'fill' : 'regular'}
            />
          )
        }}
      />
      <Tab.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <User
              size={24}
              color={color}
              weight={focused ? 'fill' : 'regular'}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
