export namespace DocumentApplicationEvent {
  export namespace DocumentCreated {
    export const key = 'document.application.document.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
