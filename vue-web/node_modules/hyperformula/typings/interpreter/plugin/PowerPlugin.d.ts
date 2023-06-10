/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class PowerPlugin extends FunctionPlugin implements FunctionPluginTypecheck<PowerPlugin> {
    static implementedFunctions: {
        POWER: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    power(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
