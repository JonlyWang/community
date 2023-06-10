/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
/**
 * Interpreter plugin containing boolean functions
 */
export declare class BooleanPlugin extends FunctionPlugin implements FunctionPluginTypecheck<BooleanPlugin> {
    static implementedFunctions: {
        TRUE: {
            method: string;
            parameters: never[];
        };
        FALSE: {
            method: string;
            parameters: never[];
        };
        IF: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                passSubtype?: undefined;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: boolean;
                passSubtype: boolean;
            })[];
        };
        AND: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            expandRanges: boolean;
        };
        OR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            expandRanges: boolean;
        };
        XOR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            expandRanges: boolean;
        };
        NOT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SWITCH: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                passSubtype?: undefined;
            } | {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            })[];
            repeatLastArgs: number;
        };
        IFERROR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        IFNA: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        CHOOSE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                passSubtype?: undefined;
            } | {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
                minValue?: undefined;
            })[];
            repeatLastArgs: number;
        };
    };
    /**
     * Corresponds to TRUE()
     *
     * Returns the logical true
     *
     * @param ast
     * @param state
     */
    literalTrue(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    /**
     * Corresponds to FALSE()
     *
     * Returns the logical false
     *
     * @param ast
     * @param state
     */
    literalFalse(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    /**
     * Corresponds to IF(expression, value_if_true, value_if_false)
     *
     * Returns value specified as second argument if expression is true and third argument if expression is false
     *
     * @param ast
     * @param state
     */
    conditionalIf(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    /**
     * Corresponds to AND(expression1, [expression2, ...])
     *
     * Returns true if all of the provided arguments are logically true, and false if any of it is logically false
     *
     * @param ast
     * @param state
     */
    and(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    /**
     * Corresponds to OR(expression1, [expression2, ...])
     *
     * Returns true if any of the provided arguments are logically true, and false otherwise
     *
     * @param ast
     * @param state
     */
    or(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    not(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    xor(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    switch(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    iferror(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ifna(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    choose(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
