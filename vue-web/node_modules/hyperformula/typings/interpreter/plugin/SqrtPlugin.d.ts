/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class SqrtPlugin extends FunctionPlugin implements FunctionPluginTypecheck<SqrtPlugin> {
    static implementedFunctions: {
        SQRT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    sqrt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
