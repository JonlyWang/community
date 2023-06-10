/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class VersionPlugin extends FunctionPlugin implements FunctionPluginTypecheck<VersionPlugin> {
    static implementedFunctions: {
        VERSION: {
            method: string;
            parameters: never[];
        };
    };
    version(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
