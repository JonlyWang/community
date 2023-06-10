/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class StatisticalPlugin extends FunctionPlugin implements FunctionPluginTypecheck<StatisticalPlugin> {
    static implementedFunctions: {
        ERF: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                optionalArg?: undefined;
            } | {
                argumentType: ArgumentTypes;
                optionalArg: boolean;
            })[];
        };
        ERFC: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'EXPON.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
                greaterThan?: undefined;
            })[];
        };
        FISHER: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
            }[];
        };
        FISHERINV: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        GAMMA: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'GAMMA.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
                greaterThan?: undefined;
            })[];
        };
        GAMMALN: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                greaterThan: number;
            }[];
        };
        'GAMMA.INV': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                lessThan: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
                lessThan?: undefined;
            })[];
        };
        GAUSS: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'BETA.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
                greaterThan?: undefined;
            })[];
        };
        'BETA.INV': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                maxValue: number;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                maxValue?: undefined;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
                greaterThan?: undefined;
                maxValue?: undefined;
            })[];
        };
        'BINOM.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
                maxValue?: undefined;
            })[];
        };
        'BINOM.INV': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
                greaterThan?: undefined;
                lessThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
                greaterThan?: undefined;
                lessThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
                minValue?: undefined;
                maxValue?: undefined;
            })[];
        };
        BESSELI: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        BESSELJ: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        BESSELK: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        BESSELY: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        'CHISQ.DIST': {
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
        'CHISQ.DIST.RT': {
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
        'CHISQ.INV': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            }[];
        };
        'CHISQ.INV.RT': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            })[];
        };
        'F.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
            })[];
        };
        'F.DIST.RT': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
        };
        'F.INV': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            })[];
        };
        'F.INV.RT': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            })[];
        };
        'WEIBULL.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
                greaterThan?: undefined;
            })[];
        };
        'POISSON.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
            })[];
        };
        'HYPGEOM.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
                greaterThan?: undefined;
            })[];
        };
        'T.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        'T.DIST.2T': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                minValue: number;
            }[];
        };
        'T.DIST.RT': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
            })[];
        };
        TDIST: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            })[];
        };
        'T.INV': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
                lessThan?: undefined;
            })[];
        };
        'T.INV.2T': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                maxValue: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
                maxValue?: undefined;
            })[];
        };
        'LOGNORM.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
            } | {
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
            })[];
        };
        'LOGNORM.INV': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
            } | {
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
                lessThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan?: undefined;
            })[];
        };
        'NORM.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
            })[];
        };
        'NORM.INV': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
            } | {
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
                lessThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan?: undefined;
            })[];
        };
        'NORM.S.DIST': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'NORM.S.INV': {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
            }[];
        };
        PHI: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
        };
        'NEGBINOM.DIST': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                maxValue: number;
            } | {
                argumentType: ArgumentTypes;
                minValue?: undefined;
                maxValue?: undefined;
            })[];
        };
        'CONFIDENCE.NORM': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan?: undefined;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
                lessThan?: undefined;
            })[];
        };
        'CONFIDENCE.T': {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan: number;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
                lessThan?: undefined;
                minValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                minValue: number;
                greaterThan?: undefined;
                lessThan?: undefined;
            })[];
        };
        STANDARDIZE: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                greaterThan?: undefined;
            } | {
                argumentType: ArgumentTypes;
                greaterThan: number;
            })[];
        };
    };
    static aliases: {
        NEGBINOMDIST: string;
        EXPONDIST: string;
        BETADIST: string;
        NORMDIST: string;
        NORMINV: string;
        NORMSDIST: string;
        NORMSINV: string;
        LOGNORMDIST: string;
        LOGINV: string;
        TINV: string;
        HYPGEOMDIST: string;
        POISSON: string;
        WEIBULL: string;
        FINV: string;
        FDIST: string;
        CHIDIST: string;
        CHIINV: string;
        GAMMADIST: string;
        'GAMMALN.PRECISE': string;
        GAMMAINV: string;
        BETAINV: string;
        BINOMDIST: string;
        CONFIDENCE: string;
        CRITBINOM: string;
        WEIBULLDIST: string;
        TINV2T: string;
        TDISTRT: string;
        TDIST2T: string;
        FINVRT: string;
        FDISTRT: string;
        CHIDISTRT: string;
        CHIINVRT: string;
        LOGNORMINV: string;
        POISSONDIST: string;
    };
    erf(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    erfc(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    expondist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    fisher(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    fisherinv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gamma(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gammadist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gammaln(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gammainv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    gauss(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    betadist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    betainv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    binomialdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    binomialinv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    besselifn(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    besseljfn(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    besselkfn(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    besselyfn(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    chisqdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    chisqdistrt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    chisqinv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    chisqinvrt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    fdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    fdistrt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    finv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    finvrt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    weibulldist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    poissondist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    hypgeomdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tdist2t(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tdistrt(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tdistold(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tinv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    tinv2t(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    lognormdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    lognorminv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    normdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    norminv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    normsdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    normsinv(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    phi(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    negbinomdist(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    confidencenorm(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    confidencet(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    standardize(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
