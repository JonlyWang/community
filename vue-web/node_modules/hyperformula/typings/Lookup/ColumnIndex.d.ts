/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { SimpleCellAddress } from '../Cell';
import { Config } from '../Config';
import { CellValueChange } from '../ContentChanges';
import { DependencyGraph } from '../DependencyGraph';
import { RawInterpreterValue, RawNoErrorScalarValue, RawScalarValue } from '../interpreter/InterpreterValue';
import { SimpleRangeValue } from '../interpreter/SimpleRangeValue';
import { ColumnsSpan } from '../Span';
import { Statistics } from '../statistics';
import { ColumnSearchStrategy } from './SearchStrategy';
declare type ColumnMap = Map<RawInterpreterValue, ValueIndex>;
interface ValueIndex {
    version: number;
    index: number[];
}
export declare class ColumnIndex implements ColumnSearchStrategy {
    private readonly dependencyGraph;
    private readonly config;
    private readonly stats;
    private readonly index;
    private readonly transformingService;
    private readonly binarySearchStrategy;
    constructor(dependencyGraph: DependencyGraph, config: Config, stats: Statistics);
    add(value: RawInterpreterValue, address: SimpleCellAddress): void;
    remove(value: RawInterpreterValue | undefined, address: SimpleCellAddress): void;
    change(oldValue: RawInterpreterValue | undefined, newValue: RawInterpreterValue, address: SimpleCellAddress): void;
    applyChanges(contentChanges: CellValueChange[]): void;
    moveValues(sourceRange: IterableIterator<[RawScalarValue, SimpleCellAddress]>, toRight: number, toBottom: number, toSheet: number): void;
    removeValues(range: IterableIterator<[RawScalarValue, SimpleCellAddress]>): void;
    find(key: RawNoErrorScalarValue, rangeValue: SimpleRangeValue, sorted: boolean): number;
    advancedFind(keyMatcher: (arg: RawInterpreterValue) => boolean, range: SimpleRangeValue): number;
    addColumns(columnsSpan: ColumnsSpan): void;
    removeColumns(columnsSpan: ColumnsSpan): void;
    removeSheet(sheetId: number): void;
    getColumnMap(sheet: number, col: number): ColumnMap;
    getValueIndex(sheet: number, col: number, value: RawInterpreterValue): ValueIndex;
    ensureRecentData(sheet: number, col: number, value: RawInterpreterValue): void;
    private addSingleCellValue;
    private removeSingleValue;
    private addRows;
    private removeRows;
    private addValue;
    private removeRowsFromValues;
    private shiftRows;
}
export declare function upperBound(values: number[], key: number): number;
export declare function lowerBound(values: number[], key: number): number;
export {};
