/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class RadixConversionPlugin extends FunctionPlugin implements FunctionPluginTypecheck<RadixConversionPlugin> {
    static implementedFunctions: {
        DEC2BIN: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        DEC2OCT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        DEC2HEX: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        BIN2DEC: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        BIN2OCT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        BIN2HEX: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        OCT2DEC: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        OCT2BIN: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        OCT2HEX: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        HEX2DEC: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        HEX2BIN: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        HEX2OCT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
        DECIMAL: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            })[];
        };
        BASE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
                minValue: number;
                maxValue: number;
            })[];
        };
    };
    dec2bin(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    dec2oct(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    dec2hex(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    bin2dec(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    bin2oct(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    bin2hex(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    oct2dec(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    oct2bin(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    oct2hex(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    hex2dec(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    hex2bin(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    hex2oct(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    base(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    decimal(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
