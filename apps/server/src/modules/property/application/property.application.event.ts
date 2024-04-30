export namespace PropertyApplicationEvent {
  export namespace PropertyCreated {
    export const key = 'property.application.property.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
