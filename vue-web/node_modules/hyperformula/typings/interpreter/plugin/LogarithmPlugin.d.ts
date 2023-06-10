/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class LogarithmPlugin extends FunctionPlugin implements FunctionPluginTypecheck<LogarithmPlugin> {
    static implementedFunctions: {
        LOG10: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        LOG: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
                greaterThan: number;
            })[];
        };
        LN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    log10(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    log(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ln(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
