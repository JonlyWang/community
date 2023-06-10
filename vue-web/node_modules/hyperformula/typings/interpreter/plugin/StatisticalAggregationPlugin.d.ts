/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class StatisticalAggregationPlugin extends FunctionPlugin implements FunctionPluginTypecheck<StatisticalAggregationPlugin> {
    static implementedFunctions: {
        AVEDEV: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        DEVSQ: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        GEOMEAN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        HARMEAN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        CORREL: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        RSQ: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'COVARIANCE.P': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'COVARIANCE.S': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'Z.TEST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
            })[];
        };
        'F.TEST': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        STEYX: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        SLOPE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'CHISQ.TEST': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'T.TEST': {
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
        SKEW: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
        'SKEW.P': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
        };
    };
    static aliases: {
        COVAR: string;
        FTEST: string;
        PEARSON: string;
        ZTEST: string;
        CHITEST: string;
        TTEST: string;
        COVARIANCEP: string;
        COVARIANCES: string;
        SKEWP: string;
    };
    avedev(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    devsq(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    geomean(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    harmean(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    correl(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    rsq(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    covariancep(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    covariances(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ztest(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ftest(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    steyx(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    slope(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    chisqtest(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ttest(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    skew(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    skewp(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
