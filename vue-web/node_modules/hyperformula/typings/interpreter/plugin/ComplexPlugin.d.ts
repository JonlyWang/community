/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class ComplexPlugin extends FunctionPlugin implements FunctionPluginTypecheck<ComplexPlugin> {
    static implementedFunctions: {
        COMPLEX: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: string;
            })[];
        };
        IMABS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMAGINARY: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMREAL: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMARGUMENT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMCONJUGATE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMCOS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMCOSH: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMCOT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMCSC: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMCSCH: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMSEC: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMSECH: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMSIN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMSINH: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMTAN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMDIV: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMPRODUCT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        IMSUM: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        IMSUB: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMEXP: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMLN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMLOG10: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMLOG2: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMPOWER: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        IMSQRT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
    };
    complex(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imabs(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imaginary(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imreal(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imargument(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imconjugate(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imcos(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imcosh(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imcot(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imcsc(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imcsch(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imsec(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imsech(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imsin(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imsinh(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imtan(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imdiv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    improduct(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imsum(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imsub(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imexp(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imln(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imlog10(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imlog2(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    impower(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    imsqrt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
