export namespace LeaseApplicationEvent {
  export namespace LeaseCreated {
    export const key = 'lease.application.lease.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
