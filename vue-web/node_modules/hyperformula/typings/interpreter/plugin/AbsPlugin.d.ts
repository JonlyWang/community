/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class AbsPlugin extends FunctionPlugin implements FunctionPluginTypecheck<AbsPlugin> {
    static implementedFunctions: {
        ABS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    abs(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
