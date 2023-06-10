/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class CharPlugin extends FunctionPlugin implements FunctionPluginTypecheck<CharPlugin> {
    static implementedFunctions: {
        CHAR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        UNICHAR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    char(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    unichar(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
