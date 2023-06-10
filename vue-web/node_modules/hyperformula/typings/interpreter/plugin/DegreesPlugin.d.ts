/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class DegreesPlugin extends FunctionPlugin implements FunctionPluginTypecheck<DegreesPlugin> {
    static implementedFunctions: {
        DEGREES: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    degrees(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
