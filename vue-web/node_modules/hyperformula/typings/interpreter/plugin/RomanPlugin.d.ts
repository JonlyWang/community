/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class RomanPlugin extends FunctionPlugin implements FunctionPluginTypecheck<RomanPlugin> {
    static implementedFunctions: {
        ROMAN: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                lessThan: number;
                optionalArg?: undefined;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                defaultValue: number;
                minValue?: undefined;
                lessThan?: undefined;
            })[];
        };
        ARABIC: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    roman(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    arabic(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
