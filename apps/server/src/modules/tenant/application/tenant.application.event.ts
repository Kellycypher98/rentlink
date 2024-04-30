export namespace TenantApplicationEvent {
  export namespace TenantCreated {
    export const key = 'tenant.application.tenant.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
