import { CaretDown } from 'phosphor-react-native'
import { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { api } from '../lib/api'
import { Loading } from './Loading'

type DateProps = {
  label: string
  date: string
}

export function SelectMonth () {
  const [dates, setDates] = useState<DateProps[]>([])
  const [dateTransaction, setDateTransaction] = useState<DateProps>({} as DateProps)
  const [dataIsLoading, setDataIsLoading] = useState(true)

  const pickerRef = useRef<Picker<string> | any>()

  function open () {
    pickerRef.current?.focus()
  }

  useEffect(() => {
    api.get('/transactions/dates')
      .then(res => {
        setDates(res.data.dates)
      })
      .finally(() => setDataIsLoading(false))
  }, [])
  return (
    <>
      <TouchableOpacity
        onPress={open}
        className='flex-row items-center border border-light-60 h-10 px-4 rounded-full'>

        {dataIsLoading
          ? <Loading size={24} color='#7F3DFF' />
          : <>
            <CaretDown size={24} color='#7F3DFF' />
            <Text className='text-sm font-inter-medium text-dark-50'>{dateTransaction.label}</Text>
          </>
        }
      </TouchableOpacity>
      <Picker
        ref={pickerRef}
        style={{ opacity: 0, display: 'none' }}
        selectedValue={dateTransaction}
        onValueChange={setDateTransaction}>
          {dates.map(date => (
            <Picker.Item key={date.date} label={date.label} value={date} />
          ))}
      </Picker>
    </>
  )
}
