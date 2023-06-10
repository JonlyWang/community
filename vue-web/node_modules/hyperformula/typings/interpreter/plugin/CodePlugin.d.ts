/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class CodePlugin extends FunctionPlugin implements FunctionPluginTypecheck<CodePlugin> {
    static implementedFunctions: {
        CODE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        UNICODE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    code(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    unicode(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
