/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class BitwiseLogicOperationsPlugin extends FunctionPlugin implements FunctionPluginTypecheck<BitwiseLogicOperationsPlugin> {
    static implementedFunctions: {
        BITAND: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
        };
        BITOR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
        };
        BITXOR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
        };
    };
    bitand(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    bitor(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    bitxor(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
