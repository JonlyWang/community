/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue, NumberType } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class FinancialPlugin extends FunctionPlugin implements FunctionPluginTypecheck<FinancialPlugin> {
    static implementedFunctions: {
        PMT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
            returnNumberType: NumberType;
        };
        IPMT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
            returnNumberType: NumberType;
        };
        PPMT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
            returnNumberType: NumberType;
        };
        FV: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
            returnNumberType: NumberType;
        };
        CUMIPMT: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
                greaterThan?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        CUMPRINC: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
                greaterThan?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        DB: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
                defaultValue: number;
            })[];
            returnNumberType: NumberType;
        };
        DDB: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                defaultValue: number;
                minValue?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        DOLLARDE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        DOLLARFR: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        EFFECT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
            returnNumberType: NumberType;
        };
        ISPMT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        NOMINAL: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
            returnNumberType: NumberType;
        };
        NPER: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
        };
        PV: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
            returnNumberType: NumberType;
        };
        RATE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
                greaterThan?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        RRI: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
            } | {
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        SLN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            returnNumberType: NumberType;
        };
        SYD: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
            })[];
            returnNumberType: NumberType;
        };
        TBILLEQ: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        TBILLPRICE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        TBILLYIELD: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
            })[];
            returnNumberType: NumberType;
        };
        FVSCHEDULE: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            returnNumberType: NumberType;
        };
        NPV: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            repeatLastArgs: number;
            returnNumberType: NumberType;
        };
        MIRR: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            returnNumberType: NumberType;
        };
        PDURATION: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                greaterThan: number;
            }[];
        };
        XNPV: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
            } | {
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
            })[];
        };
    };
    pmt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ipmt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ppmt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    fv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    cumipmt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    cumprinc(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    db(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ddb(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    dollarde(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    dollarfr(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    effect(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    ispmt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    nominal(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    nper(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    rate(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    pv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    rri(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    sln(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    syd(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tbilleq(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tbillprice(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tbillyield(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    fvschedule(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    npv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    mirr(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    pduration(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    xnpv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
