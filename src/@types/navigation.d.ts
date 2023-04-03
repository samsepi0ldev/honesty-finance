
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      main: undefined
      home: undefined
      transaction: undefined
      new: undefined
      category: undefined
      profile: undefined
      wallet: undefined
      'new-wallet': undefined
      'wallet-details': undefined
      'financial-report': undefined
      'new-income': undefined
      'new-expense': undefined
      'login': undefined
      'sign-up': undefined
      'edit-wallet': undefined
      'transaction-details': {
        transaction: {
          id: string
          type: string
          description: string
          wallet: {
            name: string
          }
          category: {
            name: string
          }
          created_at: Date
          value: number
        }
      }
    }
  }
}
