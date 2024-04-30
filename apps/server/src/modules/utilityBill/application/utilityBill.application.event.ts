export namespace UtilityBillApplicationEvent {
  export namespace UtilityBillCreated {
    export const key = 'utilityBill.application.utilityBill.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
