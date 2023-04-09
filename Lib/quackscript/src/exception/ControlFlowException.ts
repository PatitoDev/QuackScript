import { Value } from '../interpreter/types';

export type ControlFlowType = 'Break' | 'Return' | 'Continue';

// Break
// Continue
// Return
export class ControlFlowException {

    public type: ControlFlowType;
    public data: Value;

    constructor (type: ControlFlowType, data?: Value | null) {
        this.type = type;
        this.data = data ?? {
            type: 'NothingLiteral',
        } as Value;
    }
}