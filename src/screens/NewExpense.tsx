import { Camera, CaretDown, CheckCircle, Paperclip, X } from 'phosphor-react-native'
import React, { useCallback, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image as ImageComponent } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { BottomSheet, type BottomSheetRefProps } from '../components/BottomSheet'
import { HeaderSimple } from '../components/HeaderSimple'
import { ImagePickerComponent } from '../components/ImagePicker'
import PdfIcon from '../assets/pdf.svg'
import { DocumentPickerComponent } from '../components/DocumentPicker'

const categories = [
  {
    label: 'Shopping',
    value: 'shopping'
  },
  {
    label: 'Inscrição',
    value: 'subscription'
  },
  {
    label: 'Comida',
    value: 'food'
  },
  {
    label: 'Salario',
    value: 'wage'
  },
  {
    label: 'Transporte',
    value: 'transport'
  },
  {
    label: 'Investimentos',
    value: 'investments'
  }
]

const wallets = [
  {
    label: 'PicPay',
    value: 'bank'
  },
  {
    label: 'Caixa 1',
    value: 'checkout'
  },
  {
    label: 'Caixa 2',
    value: 'checkout'
  },
  {
    label: 'PayPal',
    value: 'bank'
  }
]

export function NewExpense () {
  const [image, setImage] = useState<string | null>(null)
  const [document, setDocument] = useState<string | null>(null)
  const [category, setCategory] = useState('')
  const [wallet, setWallet] = useState('')
  const ref = useRef<BottomSheetRefProps>(null)
  const refBottomSheepCategory = useRef<BottomSheetRefProps>(null)
  const refBottomSheepWallet = useRef<BottomSheetRefProps>(null)

  const openBottomSheep = useCallback(() => {
    ref.current?.scrollTo(-200)
  }, [])
  const openCategoryBottomSheep = useCallback(() => {
    refBottomSheepCategory.current?.scrollTo(-200)
  }, [])
  const openWalletBottomSheep = useCallback(() => {
    refBottomSheepWallet.current?.scrollTo(-200)
  }, [])
  return (
    <View className='flex-1 bg-red-100'>
      <HeaderSimple
        title='Despesa'
        backButton
        light
      />
      <ScrollView
        contentContainerStyle={{
          marginTop: 'auto'
        }}>
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
          <TouchableWithoutFeedback onPress={openCategoryBottomSheep}>
            <View className='w-full h-14 border border-light-60 rounded-2xl px-3 flex-row items-center justify-between'>
              {category
                ? (
                <View className='bg-light-80 border border-light-60 p-2 pr-4 rounded-full flex-row items-center'>
                  <View className='w-3.5 h-3.5 rounded-full bg-green-100 mr-2' />
                  <Text className='font-inter-medium text-sm text-dark-50 leading-[14px]'>{category}</Text>
                </View>
                  )
                : <Text className='text-light-20 font-inter-regular text-base'>Categoria</Text>}
              <CaretDown size={24} color='#91919F' />
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
            placeholder='Descrição'
            placeholderTextColor='#91919F'
          />
          <TouchableWithoutFeedback onPress={openWalletBottomSheep}>
            <View className='mt-4 w-full h-14 border border-light-60 rounded-2xl px-4 flex-row items-center justify-between'>
              {wallet
                ? (
                <View className='rounded-full flex-row items-center'>
                  <Text className='font-inter-medium text-sm text-dark-50'>{wallet}</Text>
                </View>
                  )
                : <Text className='text-light-20 font-inter-regular text-base'>Carteira</Text>}
              <CaretDown size={24} color='#91919F' />
            </View>
          </TouchableWithoutFeedback>
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
          <TouchableOpacity
            activeOpacity={0.7}
            className='mt-6 bg-violet-100 items-center justify-center h-14 rounded-2xl'>
            <Text className='text-lg text-light-80 font-inter-semibold'>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
      <BottomSheet ref={refBottomSheepCategory}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 16
          }}
          showsVerticalScrollIndicator={false}
        >
          {categories.map(({ label, value }, i) => (
            <TouchableOpacity
              key={i} onPress={() => setCategory(value)}
              className='h-14 flex-row items-center justify-between'>
              <Text className='text-dark-100 text-sm font-inter-medium'>{label}</Text>
              {value === category && <CheckCircle weight='fill' size={24} color='#5233FF' />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheet>
      <BottomSheet ref={refBottomSheepWallet}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 16
          }}
          showsVerticalScrollIndicator={false}>
          {wallets.map(({ label, value }, i) => (
            <TouchableOpacity
              key={i} onPress={() => setWallet(label)}
              className='h-14 flex-row items-center justify-between'>
              <Text className='text-dark-100 text-sm font-inter-medium'>{label}</Text>
              {value === wallet && <CheckCircle weight='fill' size={24} color='#5233FF' />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheet>
    </View>
  )
}
