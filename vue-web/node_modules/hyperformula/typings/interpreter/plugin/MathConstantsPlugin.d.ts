/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare const PI: number;
export declare class MathConstantsPlugin extends FunctionPlugin implements FunctionPluginTypecheck<MathConstantsPlugin> {
    static implementedFunctions: {
        PI: {
            method: string;
            parameters: never[];
        };
        SQRTPI: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
        };
    };
    pi(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    sqrtpi(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
