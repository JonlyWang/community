/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { Config } from '../Config';
import { DependencyGraph } from '../DependencyGraph';
import { RawNoErrorScalarValue } from '../interpreter/InterpreterValue';
import { SimpleRangeValue } from '../interpreter/SimpleRangeValue';
import { AdvancedFind } from './AdvancedFind';
import { SearchStrategy } from './SearchStrategy';
export declare class RowSearchStrategy extends AdvancedFind implements SearchStrategy {
    private config;
    protected dependencyGraph: DependencyGraph;
    constructor(config: Config, dependencyGraph: DependencyGraph);
    find(key: RawNoErrorScalarValue, rangeValue: SimpleRangeValue, sorted: boolean): number;
}
