/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class ExpPlugin extends FunctionPlugin implements FunctionPluginTypecheck<ExpPlugin> {
    static implementedFunctions: {
        EXP: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    /**
     * Corresponds to EXP(value)
     *
     * Calculates the exponent for basis e
     *
     * @param ast
     * @param state
     */
    exp(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
