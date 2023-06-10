/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class IsOddPlugin extends FunctionPlugin implements FunctionPluginTypecheck<IsOddPlugin> {
    static implementedFunctions: {
        ISODD: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    isodd(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
