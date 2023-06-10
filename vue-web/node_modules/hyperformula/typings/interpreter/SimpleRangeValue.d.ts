/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange } from '../AbsoluteCellRange';
import { ArraySize } from '../ArraySize';
import { SimpleCellAddress } from '../Cell';
import { DependencyGraph } from '../DependencyGraph';
import { InternalScalarValue } from './InterpreterValue';
export declare class SimpleRangeValue {
    private _data?;
    readonly range?: AbsoluteCellRange | undefined;
    private readonly dependencyGraph?;
    private _hasOnlyNumbers?;
    readonly size: ArraySize;
    constructor(_data?: InternalScalarValue[][] | undefined, range?: AbsoluteCellRange | undefined, dependencyGraph?: DependencyGraph | undefined, _hasOnlyNumbers?: boolean | undefined);
    get data(): InternalScalarValue[][];
    static fromRange(data: InternalScalarValue[][], range: AbsoluteCellRange, dependencyGraph: DependencyGraph): SimpleRangeValue;
    static onlyNumbers(data: number[][]): SimpleRangeValue;
    static onlyValues(data: InternalScalarValue[][]): SimpleRangeValue;
    static onlyRange(range: AbsoluteCellRange, dependencyGraph: DependencyGraph): SimpleRangeValue;
    static fromScalar(scalar: InternalScalarValue): SimpleRangeValue;
    isAdHoc(): boolean;
    width(): number;
    height(): number;
    valuesFromTopLeftCorner(): InternalScalarValue[];
    effectiveAddressesFromData(leftCorner: SimpleCellAddress): IterableIterator<SimpleCellAddress>;
    entriesFromTopLeftCorner(leftCorner: SimpleCellAddress): IterableIterator<[InternalScalarValue, SimpleCellAddress]>;
    iterateValuesFromTopLeftCorner(): IterableIterator<InternalScalarValue>;
    numberOfElements(): number;
    hasOnlyNumbers(): boolean;
    rawNumbers(): number[][];
    rawData(): InternalScalarValue[][];
    sameDimensionsAs(other: SimpleRangeValue): boolean;
    private ensureThatComputed;
}
