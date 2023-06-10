/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class SimpleArithmerticPlugin extends FunctionPlugin implements FunctionPluginTypecheck<SimpleArithmerticPlugin> {
    static implementedFunctions: {
        'HF.ADD': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.CONCAT': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.DIVIDE': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.EQ': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.GT': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.GTE': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.LT': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.LTE': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.MINUS': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.MULTIPLY': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.NE': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.POW': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.UMINUS': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.UNARY_PERCENT': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
        'HF.UPLUS': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                passSubtype: boolean;
            }[];
        };
    };
    add(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    concat(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    divide(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    eq(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gte(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    lt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    lte(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    minus(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    multiply(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ne(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    pow(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    uminus(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    upercent(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    uplus(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
