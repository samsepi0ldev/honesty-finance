import clsx from 'clsx'
import { useState } from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { VictoryArea } from 'victory-native'

const chartFilter = [
  'Hoje',
  'Semana',
  'Mes',
  'Ano'
]

interface ChartProps {
  withFilter?: boolean
  data: Array<{
    x: any
    y: number
  }>
}

export function Chart ({ withFilter, data }: ChartProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions()
  const [filter, setFilter] = useState('')
  return (
    <>
      {withFilter ?? <Text className='text-3xl font-inter-semibold text-dark-100 px-4'>$ 433</Text>}
      <VictoryArea
        interpolation='basis'
        width={SCREEN_WIDTH}
        height={170}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        padding={{ top: 10, bottom: 10 }}
        style={{
          data: {
            stroke: '#7F3DFF',
            strokeWidth: 6,
            fill: '#EEE5FF'
          }
        }}
        data={data}
      />{withFilter && (
        <View className='py-2 px-4 flex-row flex-1 items-center justify-around'>
        {chartFilter.map((text, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setFilter(text)}
            className={clsx('h-9 items-center justify-center rounded-full px-6', {
              'bg-yellow-20': filter === text
            })}>
            <Text className={clsx('text-sm', {
              'text-yellow-100 font-inter-bold': filter === text,
              'text-light-20 font-inter-medium': filter !== text
            })}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      )}

    </>
  )
}
