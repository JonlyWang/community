/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ArraySize } from '../../ArraySize';
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class ArrayPlugin extends FunctionPlugin implements FunctionPluginTypecheck<ArrayPlugin> {
    static implementedFunctions: {
        ARRAYFORMULA: {
            method: string;
            arraySizeMethod: string;
            arrayFunction: boolean;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        ARRAY_CONSTRAIN: {
            method: string;
            arraySizeMethod: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
            vectorizationForbidden: boolean;
        };
        FILTER: {
            method: string;
            arraySizeMethod: string;
            arrayFunction: boolean;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
    };
    arrayformula(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    arrayformulaArraySize(ast: ProcedureAst, state: InterpreterState): ArraySize;
    arrayconstrain(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    arrayconstrainArraySize(ast: ProcedureAst, state: InterpreterState): ArraySize;
    filter(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    filterArraySize(ast: ProcedureAst, state: InterpreterState): ArraySize;
}
