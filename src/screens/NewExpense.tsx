import { CaretDown, CheckCircle, Paperclip, X } from 'phosphor-react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Camera, CameraType, FlashMode } from 'expo-camera'

import { BottomSheet, type BottomSheetRefProps } from '../components/BottomSheet'
import { HeaderSimple } from '../components/HeaderSimple'
import { ImagePickerComponent } from '../components/ImagePicker'
import PdfIcon from '../assets/pdf.svg'
import { DocumentPickerComponent } from '../components/DocumentPicker'
import { Button } from '../components/Button'
import { CameraComponent } from '../components/Camera'
import { AlertMessage } from '../components/AlertMessage'

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
  const [ok, setOk] = useState(false)
  const [isCameraOpened, setIsCameraOpened] = useState(false)

  const ref = useRef<BottomSheetRefProps>(null)
  const refBottomSheepCategory = useRef<BottomSheetRefProps>(null)
  const refBottomSheepWallet = useRef<BottomSheetRefProps>(null)
  const refCamera = useRef<Camera>(null)

  async function takePicture () {
    if (refCamera?.current) {
      const { uri } = await refCamera.current.takePictureAsync()
      setImage(uri)
      setIsCameraOpened(false)
      ref.current?.scrollTo(0)
    }
  }

  const startCamera = useCallback((permission: boolean | undefined) => {
    if (permission) {
      setIsCameraOpened(permission)
    }
  }, [])

  const openBottomSheep = useCallback(() => {
    ref.current?.scrollTo(-200)
  }, [])
  const openCategoryBottomSheep = useCallback(() => {
    refBottomSheepCategory.current?.scrollTo(-200)
  }, [])
  const openWalletBottomSheep = useCallback(() => {
    refBottomSheepWallet.current?.scrollTo(-200)
  }, [])
  useEffect(() => {
    StatusBar.setBackgroundColor('#FD3C4A')
    StatusBar.setBarStyle('light-content')
    setIsCameraOpened(false)
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
                  ? <Image
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
          <Button
            className='mt-6'
            onPress={() => alert('Expense statement coming soon')}>
            Continuar
          </Button>
        </View>
      </ScrollView>
      <BottomSheet ref={ref}>
        <View className='mt-7 flex-row'>
          <CameraComponent startCam={startCamera} />
          <ImagePickerComponent
            imageState={setImage}
            fn={() => ref.current?.scrollTo(0)}
          />
          <DocumentPickerComponent
            documentState={setDocument}
            fn={() => ref.current?.scrollTo(0)}
          />
        </View>
      </BottomSheet>
      <BottomSheet ref={refBottomSheepCategory}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 32
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
            paddingBottom: 32
          }}
          showsVerticalScrollIndicator={false}>
          {wallets.map(({ label, value }, i) => (
            <TouchableOpacity
              key={i} onPress={() => setWallet(label)}
              className='h-14 flex-row items-center justify-between'>
              <Text className='text-dark-100 text-sm font-inter-medium'>{label}</Text>
              {label === wallet && <CheckCircle weight='fill' size={24} color='#5233FF' />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheet>
      {ok && <AlertMessage
        type='success'
        message='A transação foi criada com sucesso'
        onPress={() => setOk(false)}
      />}
      {isCameraOpened && <Camera
        autoFocus={true}
        ref={refCamera}
        type={CameraType.back}
        flashMode={FlashMode.auto}
        ratio='16:9'
        className='flex-1 absolute inset-0 items-center justify-end pb-10'
      >
        <TouchableOpacity
          onPress={() => setIsCameraOpened(false)}
          className='absolute top-4 right-4 items-center justify-center' >
          <X size={32} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takePicture}
          className='w-20 h-20 rounded-full border-2 border-light-20 border-spacing-4 items-center justify-center'>
          <View className='w-16 h-16 bg-light-100 rounded-full' />
        </TouchableOpacity>
      </Camera>}
    </View>
  )
}
