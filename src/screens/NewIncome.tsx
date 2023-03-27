import { Camera, Paperclip, X } from 'phosphor-react-native'
import React, { useCallback, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image as ImageComponent } from 'react-native'

import { BottomSheet, type BottomSheetRefProps } from '../components/BottomSheet'
import { HeaderSimple } from '../components/HeaderSimple'
import { ImagePickerComponent } from '../components/ImagePicker'
import PdfIcon from '../assets/pdf.svg'
import { DocumentPickerComponent } from '../components/DocumentPicker'

export function NewIncome () {
  const [image, setImage] = useState<string | null>(null)
  const [document, setDocument] = useState<string | null>(null)
  const ref = useRef<BottomSheetRefProps>(null)

  const openBottomSheep = useCallback(() => {
    ref.current?.scrollTo(-200)
  }, [])
  return (
    <View className='flex-1 bg-green-100'>
      <HeaderSimple
        title='Renda'
        backButton
        light
      />
      <View className='mt-auto'>
        <View className='px-4'>
          <Text className='font-inter-semibold text-lg text-light-80/60'>Quanto?</Text>
          <TextInput
            className='font-inter-semibold text-6xl text-light-80'
            placeholderTextColor='#FCFCFC'
            placeholder='$00.0'
            keyboardType='numeric'
          />
        </View>
        <View className='bg-light-100 rounded-t-3xl py-6 px-4'>
          <TextInput
            className='w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
            placeholder='Categoria'
            placeholderTextColor='#91919F'
          />
          <TextInput
            className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
            placeholder='Descrição'
            placeholderTextColor='#91919F'
          />
          <TextInput
            className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
            placeholder='Carteira'
            placeholderTextColor='#91919F'
          />
          {image ?? document
            ? (
              <View className='relative w-[118px] h-[118px] items-start justify-end mt-4'>
                {image
                  ? <ImageComponent
                  source={{ uri: image }}
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: 8
                  }} />
                  : <PdfIcon height={96} width={96} />
                }
                <TouchableOpacity
                  onPress={() => {
                    setImage(null)
                    setDocument(null)
                  }}
                  className='absolute top-0 right-0 w- bg-dark-100/30 h-6 w-6 items-center justify-center rounded-full'>
                  <X size={12} weight='bold' color='#ffffff' />
                </TouchableOpacity>
              </View>
              )
            : (
              <TouchableWithoutFeedback onPress={openBottomSheep}>
                <View
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderRadius: 16,
                    borderColor: '#E3E5E5'
                  }}
                  className='flex-row items-center justify-center h-14 mt-4'>
                  <Paperclip size={32} weight='bold' color='#91919F' />
                  <Text className='text-base font-inter-regular text-light-20 ml-2.5'>Adicionar anexo</Text>
                </View>
              </TouchableWithoutFeedback>
              )
          }
          <TouchableOpacity className='mt-6 bg-violet-100 items-center justify-center h-14 rounded-2xl'>
            <Text className='text-lg text-light-80 font-inter-semibold'>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet ref={ref}>
        <TouchableOpacity className='flex-1 mr-2 h-24 bg-violet-20 rounded-2xl items-center justify-center'>
          <Camera weight='fill' size={32} color='#7F3DFF' />
          <Text className='text-base text-violet-100 font-inter-semibold mt-2'>Camera</Text>
        </TouchableOpacity>
        <ImagePickerComponent
          imageState={setImage}
          fn={() => ref.current?.scrollTo(0)}
        />
        <DocumentPickerComponent
          documentState={setDocument}
          fn={() => ref.current?.scrollTo(0)}
        />
      </BottomSheet>
    </View>
  )
}
