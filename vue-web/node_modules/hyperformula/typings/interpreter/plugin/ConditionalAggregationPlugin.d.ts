/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class ConditionalAggregationPlugin extends FunctionPlugin implements FunctionPluginTypecheck<ConditionalAggregationPlugin> {
    static implementedFunctions: {
        SUMIF: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
            })[];
        };
        COUNTIF: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        AVERAGEIF: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
            })[];
        };
        SUMIFS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        COUNTIFS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        MINIFS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        MAXIFS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
    };
    /**
     * Corresponds to SUMIF(Range, Criterion, SumRange)
     *
     * Range is the range to which criterion is to be applied.
     * Criterion is the criteria used to choose which cells will be included in sum.
     * SumRange is the range on which adding will be performed.
     *
     * @param ast
     * @param state
     */
    sumif(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    sumifs(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    averageif(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    /**
     * Corresponds to COUNTIF(Range, Criterion)
     *
     * Range is the range to which criterion is to be applied.
     * Criterion is the criteria used to choose which cells will be included in sum.
     *
     * Returns number of cells on which criteria evaluate to true.
     *
     * @param ast
     * @param state
     */
    countif(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    countifs(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    minifs(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    maxifs(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    private computeConditionalAggregationFunction;
}
