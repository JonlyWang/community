/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class RadiansPlugin extends FunctionPlugin implements FunctionPluginTypecheck<RadiansPlugin> {
    static implementedFunctions: {
        RADIANS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    radians(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
