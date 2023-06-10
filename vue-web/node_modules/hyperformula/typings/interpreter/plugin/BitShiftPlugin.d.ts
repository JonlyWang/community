/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class BitShiftPlugin extends FunctionPlugin implements FunctionPluginTypecheck<BitShiftPlugin> {
    static implementedFunctions: {
        BITLSHIFT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            })[];
        };
        BITRSHIFT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            })[];
        };
    };
    bitlshift(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    bitrshift(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
