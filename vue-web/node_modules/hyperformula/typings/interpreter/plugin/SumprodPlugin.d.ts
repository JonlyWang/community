/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class SumprodPlugin extends FunctionPlugin implements FunctionPluginTypecheck<SumprodPlugin> {
    static implementedFunctions: {
        SUMPRODUCT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
    };
    sumproduct(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
