/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { SearchStrategy } from '../../Lookup/SearchStrategy';
import { ProcedureAst } from '../../parser';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue, RawNoErrorScalarValue } from '../InterpreterValue';
import { SimpleRangeValue } from '../SimpleRangeValue';
import { ArgumentTypes, FunctionPlugin, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class LookupPlugin extends FunctionPlugin implements FunctionPluginTypecheck<LookupPlugin> {
    static implementedFunctions: {
        VLOOKUP: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: boolean;
            })[];
        };
        HLOOKUP: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: boolean;
            })[];
        };
        MATCH: {
            method: string;
            parameters: ({
                argumentType: ArgumentTypes;
                defaultValue?: undefined;
            } | {
                argumentType: ArgumentTypes;
                defaultValue: number;
            })[];
        };
    };
    private rowSearch;
    /**
     * Corresponds to VLOOKUP(key, range, index, [sorted])
     *
     * @param ast
     * @param state
     */
    vlookup(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    /**
     * Corresponds to HLOOKUP(key, range, index, [sorted])
     *
     * @param ast
     * @param formulaAddress
     */
    hlookup(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    match(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
    protected searchInRange(key: RawNoErrorScalarValue, range: SimpleRangeValue, sorted: boolean, searchStrategy: SearchStrategy): number;
    private doVlookup;
    private doHlookup;
    private doMatch;
}
