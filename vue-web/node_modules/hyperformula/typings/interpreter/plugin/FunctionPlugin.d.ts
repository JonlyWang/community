/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { ArraySize, ArraySizePredictor } from '../../ArraySize';
import { CellError, SimpleCellAddress } from '../../Cell';
import { Config } from '../../Config';
import { DateTimeHelper } from '../../DateTimeHelper';
import { DependencyGraph } from '../../DependencyGraph';
import { SearchStrategy } from '../../Lookup/SearchStrategy';
import { Maybe } from '../../Maybe';
import { Ast, ProcedureAst } from '../../parser';
import { Serialization } from '../../Serialization';
import { ArithmeticHelper, complex } from '../ArithmeticHelper';
import { Interpreter } from '../Interpreter';
import { InterpreterState } from '../InterpreterState';
import { ExtendedNumber, InternalScalarValue, InterpreterValue, NumberType, RawNoErrorScalarValue, RawScalarValue } from '../InterpreterValue';
export interface ImplementedFunctions {
    [formulaId: string]: FunctionMetadata;
}
export interface FunctionMetadata {
    /**
     * Internal and engine.
     */
    parameters?: FunctionArgument[];
    /**
     * Internal.
     *
     * For functions with a variable number of arguments: sets how many last arguments can be repeated indefinitely.
     */
    repeatLastArgs?: number;
    /**
     * Internal.
     *
     * If set to `true`, ranges in the function's arguments are inlined to (possibly multiple) scalar arguments.
     */
    expandRanges?: boolean;
    /**
     * Internal.
     *
     * Return number value is packed into this subtype.
     */
    returnNumberType?: NumberType;
    /**
     * Engine.
     */
    method: string;
    /**
     * Engine.
     */
    arraySizeMethod?: string;
    /**
     * Engine.
     *
     * If set to `true`, the function is volatile.
     */
    isVolatile?: boolean;
    /**
     * Engine.
     *
     * If set to `true`, the function gets recalculated with each sheet shape change
     * (e.g. when adding/removing rows or columns).
     */
    isDependentOnSheetStructureChange?: boolean;
    /**
     * Engine.
     *
     * If set to `true`, the function treats reference or range arguments as arguments that don't create dependency.
     *
     * Other arguments are properly evaluated.
     */
    doesNotNeedArgumentsToBeComputed?: boolean;
    /**
     * Engine.
     *
     * If set to `true`, the function enables the array arithmetic mode in its arguments and nested expressions.
     */
    arrayFunction?: boolean;
    /**
     * Internal.
     *
     * If set to `true`, prevents the function from ever being vectorized.
     *
     * Some functions do not allow vectorization: array-output, and special functions.
     */
    vectorizationForbidden?: boolean;
}
export interface FunctionPluginDefinition {
    implementedFunctions: ImplementedFunctions;
    aliases?: {
        [formulaId: string]: string;
    };
    new (interpreter: Interpreter): FunctionPlugin;
}
export declare enum ArgumentTypes {
    /**
     * String type.
     */
    STRING = "STRING",
    /**
     * Floating point type.
     */
    NUMBER = "NUMBER",
    /**
     * Boolean type.
     */
    BOOLEAN = "BOOLEAN",
    /**
     * Any non-range value.
     */
    SCALAR = "SCALAR",
    /**
     * Any non-range, no-error type.
     */
    NOERROR = "NOERROR",
    /**
     * Range type.
     */
    RANGE = "RANGE",
    /**
     * Integer type.
     */
    INTEGER = "INTEGER",
    /**
     * String representing complex number.
     */
    COMPLEX = "COMPLEX",
    /**
     * Range or scalar.
     */
    ANY = "ANY"
}
export interface FunctionArgument {
    argumentType: ArgumentTypes;
    /**
     * If set to `true`, arguments need to be passed with full type information.
     * (e.g. for numbers: `Date` or `DateTime` or `Time` or `Currency` or `Percentage`)
     */
    passSubtype?: boolean;
    /**
     * If an argument is missing, its value defaults to `defaultValue`.
     */
    defaultValue?: InternalScalarValue | RawScalarValue;
    /**
     * If set to `true`:
     * if an argument is missing, and no `defaultValue` is set, the argument is `undefined` (instead of throwing an error).
     *
     * This is logically equivalent to setting `defaultValue` to `undefined`.
     */
    optionalArg?: boolean;
    /**
     * If set, numerical arguments need to be greater than or equal to `minValue`.
     */
    minValue?: number;
    /**
     * If set, numerical arguments need to be less than or equal to `maxValue`.
     */
    maxValue?: number;
    /**
     * If set, numerical arguments need to be less than `lessThan`.
     */
    lessThan?: number;
    /**
     * If set, numerical arguments need to be greater than `greaterThan`.
     */
    greaterThan?: number;
}
export declare type PluginFunctionType = (ast: ProcedureAst, state: InterpreterState) => InterpreterValue;
export declare type PluginArraySizeFunctionType = (ast: ProcedureAst, state: InterpreterState) => ArraySize;
export declare type FunctionPluginTypecheck<T> = {
    [K in keyof T]: T[K] extends PluginFunctionType | PluginArraySizeFunctionType ? T[K] : never;
};
/**
 * Abstract class representing interpreter function plugin.
 * Plugin may contain multiple functions. Each function should be of type {@link PluginFunctionType} and needs to be
 * included in {@link implementedFunctions}
 */
export declare abstract class FunctionPlugin implements FunctionPluginTypecheck<FunctionPlugin> {
    /**
     * Dictionary containing functions implemented by specific plugin, along with function name translations.
     */
    static implementedFunctions: ImplementedFunctions;
    static aliases?: {
        [formulaId: string]: string;
    };
    protected readonly interpreter: Interpreter;
    protected readonly dependencyGraph: DependencyGraph;
    protected readonly columnSearch: SearchStrategy;
    protected readonly config: Config;
    protected readonly serialization: Serialization;
    protected readonly arraySizePredictor: ArraySizePredictor;
    protected readonly dateTimeHelper: DateTimeHelper;
    protected readonly arithmeticHelper: ArithmeticHelper;
    constructor(interpreter: Interpreter);
    protected evaluateAst(ast: Ast, state: InterpreterState): InterpreterValue;
    protected arraySizeForAst(ast: Ast, state: InterpreterState): ArraySize;
    protected listOfScalarValues(asts: Ast[], state: InterpreterState): [InternalScalarValue, boolean][];
    protected coerceScalarToNumberOrError: (arg: InternalScalarValue) => ExtendedNumber | CellError;
    protected coerceToType(arg: InterpreterValue, coercedType: FunctionArgument, state: InterpreterState): Maybe<InterpreterValue | complex | RawNoErrorScalarValue>;
    protected runFunction: (args: Ast[], state: InterpreterState, metadata: FunctionMetadata, fn: (...arg: any) => InterpreterValue) => InterpreterValue;
    protected runFunctionWithReferenceArgument: (args: Ast[], state: InterpreterState, metadata: FunctionMetadata, noArgCallback: () => InternalScalarValue, referenceCallback: (reference: SimpleCellAddress) => InternalScalarValue, nonReferenceCallback?: (...arg: any) => InternalScalarValue) => InterpreterValue;
    protected metadata(name: string): FunctionMetadata;
    private returnNumberWrapper;
}
