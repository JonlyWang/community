/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class ModuloPlugin extends FunctionPlugin implements FunctionPluginTypecheck<ModuloPlugin> {
    static implementedFunctions: {
        MOD: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    mod(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
