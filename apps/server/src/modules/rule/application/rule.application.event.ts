export namespace RuleApplicationEvent {
  export namespace RuleCreated {
    export const key = 'rule.application.rule.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
