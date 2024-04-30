export namespace MaintenanceApplicationEvent {
  export namespace MaintenanceCreated {
    export const key = 'maintenance.application.maintenance.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
