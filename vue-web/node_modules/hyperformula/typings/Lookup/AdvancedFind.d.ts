/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { DependencyGraph } from '../DependencyGraph';
import { RawInterpreterValue } from '../interpreter/InterpreterValue';
import { SimpleRangeValue } from '../interpreter/SimpleRangeValue';
export declare abstract class AdvancedFind {
    protected dependencyGraph: DependencyGraph;
    protected constructor(dependencyGraph: DependencyGraph);
    advancedFind(keyMatcher: (arg: RawInterpreterValue) => boolean, rangeValue: SimpleRangeValue): number;
}
