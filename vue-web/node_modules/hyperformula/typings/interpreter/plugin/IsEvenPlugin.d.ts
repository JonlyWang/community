/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class IsEvenPlugin extends FunctionPlugin implements FunctionPluginTypecheck<IsEvenPlugin> {
    static implementedFunctions: {
        ISEVEN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    iseven(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
