/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
/**
 * Interpreter plugin containing text-specific functions
 */
export declare class TextPlugin extends FunctionPlugin implements FunctionPluginTypecheck<TextPlugin> {
    static implementedFunctions: {
        CONCATENATE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            expandRanges: boolean;
        };
        EXACT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SPLIT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        LEN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        LOWER: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        MID: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        TRIM: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        T: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        PROPER: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        CLEAN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        REPT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        RIGHT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
        };
        LEFT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
        };
        REPLACE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SEARCH: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
        };
        SUBSTITUTE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
            })[];
        };
        FIND: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
        };
        UPPER: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    /**
     * Corresponds to CONCATENATE(value1, [value2, ...])
     *
     * Concatenates provided arguments to one string.
     *
     * @param ast
     * @param state
     */
    concatenate(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    /**
     * Corresponds to SPLIT(string, index)
     *
     * Splits provided string using space separator and returns chunk at zero-based position specified by second argument
     *
     * @param ast
     * @param state
     */
    split(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    len(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    lower(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    trim(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    proper(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    clean(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    exact(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    rept(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    right(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    left(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    mid(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    replace(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    search(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    substitute(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    find(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    t(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    upper(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
