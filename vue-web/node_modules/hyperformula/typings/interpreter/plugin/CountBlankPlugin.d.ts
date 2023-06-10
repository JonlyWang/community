/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
/**
 * Interpreter plugin containing MEDIAN function
 */
export declare class CountBlankPlugin extends FunctionPlugin implements FunctionPluginTypecheck<CountBlankPlugin> {
    static implementedFunctions: {
        COUNTBLANK: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            expandRanges: boolean;
        };
    };
    countblank(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
