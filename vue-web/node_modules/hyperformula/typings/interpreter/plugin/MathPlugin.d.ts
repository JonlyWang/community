/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class MathPlugin extends FunctionPlugin implements FunctionPluginTypecheck<MathPlugin> {
    static implementedFunctions: {
        FACT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            }[];
        };
        FACTDOUBLE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            }[];
        };
        COMBIN: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                lessThan: number;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                lessThan?: undefined;
            })[];
        };
        COMBINA: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
        };
        GCD: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        LCM: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        MROUND: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        MULTINOMIAL: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            expandRanges: boolean;
        };
        QUOTIENT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SERIESSUM: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SIGN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SUMX2MY2: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SUMX2PY2: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SUMXMY2: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    fact(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    factdouble(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    combin(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    combina(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gcd(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    lcm(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    mround(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    multinomial(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    quotient(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    seriessum(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    sign(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    sumx2my2(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    sumx2py2(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    sumxmy2(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
