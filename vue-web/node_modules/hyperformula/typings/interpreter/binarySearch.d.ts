/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange } from '../AbsoluteCellRange';
import { DependencyGraph } from '../DependencyGraph';
import { RawInterpreterValue, RawNoErrorScalarValue } from './InterpreterValue';
export declare function rangeLowerBound(range: AbsoluteCellRange, key: RawNoErrorScalarValue, dependencyGraph: DependencyGraph, coordinate: 'row' | 'col'): number;
export declare function lowerBound(value: (index: number) => RawInterpreterValue, key: RawNoErrorScalarValue, start: number, end: number): number;
export declare function compare(left: RawNoErrorScalarValue, right: RawInterpreterValue): number;
