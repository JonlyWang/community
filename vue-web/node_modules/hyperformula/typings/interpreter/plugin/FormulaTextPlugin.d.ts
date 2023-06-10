/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ProcedureAst } from '../../parser';
import { FunctionPlugin } from '../index';
import { InterpreterState } from '../InterpreterState';
import { InterpreterValue } from '../InterpreterValue';
import { ArgumentTypes, FunctionPluginTypecheck } from './FunctionPlugin';
export declare class FormulaTextPlugin extends FunctionPlugin implements FunctionPluginTypecheck<FormulaTextPlugin> {
    static implementedFunctions: {
        FORMULATEXT: {
            method: string;
            parameters: {
                argumentType: ArgumentTypes;
            }[];
            doesNotNeedArgumentsToBeComputed: boolean;
            isDependentOnSheetStructureChange: boolean;
            vectorizationForbidden: boolean;
        };
    };
    /**
     * Corresponds to FORMULATEXT(value)
     *
     * Returns a formula in a given cell as a string.
     *
     * @param ast
     * @param state
     */
    formulatext(ast: ProcedureAst, state: InterpreterState): InterpreterValue;
}
