/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
/**
 * Interpreter plugin containing MEDIAN function
 */
export declare class MedianPlugin extends FunctionPlugin implements FunctionPluginTypecheck<MedianPlugin> {
    static implementedFunctions: {
        MEDIAN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        LARGE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        SMALL: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
    };
    /**
     * Corresponds to MEDIAN(Number1, Number2, ...).
     *
     * Returns a median of given numbers.
     *
     * @param ast
     * @param state
     */
    median(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    large(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    small(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
