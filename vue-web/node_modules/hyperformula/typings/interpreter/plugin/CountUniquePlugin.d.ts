/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
/**
 * Interpreter plugin containing COUNTUNIQUE function
 */
export declare class CountUniquePlugin extends FunctionPlugin implements FunctionPluginTypecheck<CountUniquePlugin> {
    static implementedFunctions: {
        COUNTUNIQUE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            expandRanges: boolean;
        };
    };
    /**
     * Corresponds to COUNTUNIQUE(Number1, Number2, ...).
     *
     * Returns number of unique numbers from arguments
     *
     * @param ast
     * @param state
     */
    countunique(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
