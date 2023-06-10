/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ArraySize } from '../../ArraySize';
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare type KernelRunShortcut = (...args: any[]) => number[][];
export declare type KernelFunction = ((this: KernelFunctionThis, ...args: any[]) => number);
export interface KernelFunctionThis {
    thread: {
        x: number;
        y?: number;
    };
}
export declare class MatrixPlugin extends FunctionPlugin implements FunctionPluginTypecheck<MatrixPlugin> {
    static implementedFunctions: {
        MMULT: {
            method: string;
            arraySizeMethod: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            vectorizationForbidden: boolean;
        };
        TRANSPOSE: {
            method: string;
            arraySizeMethod: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            vectorizationForbidden: boolean;
        };
        MAXPOOL: {
            method: string;
            arraySizeMethod: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
            })[];
            vectorizationForbidden: boolean;
        };
        MEDIANPOOL: {
            method: string;
            arraySizeMethod: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
            })[];
            vectorizationForbidden: boolean;
        };
    };
    mmult(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    mmultArraySize(ast: ProcedureAst, state: InterpreterState): ArraySize;
    maxpool(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    medianpool(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    maxpoolArraySize(ast: ProcedureAst, state: InterpreterState): ArraySize;
    medianpoolArraySize(ast: ProcedureAst, state: InterpreterState): ArraySize;
    transpose(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    transposeArraySize(ast: ProcedureAst, state: InterpreterState): ArraySize;
    private createKernel;
}
