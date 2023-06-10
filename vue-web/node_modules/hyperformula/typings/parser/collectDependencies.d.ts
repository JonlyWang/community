/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { FunctionRegistry } from '../interpreter/FunctionRegistry';
import { Ast, RelativeDependency } from './';
export declare const collectDependencies: (ast: Ast, functionRegistry: FunctionRegistry) => RelativeDependency[];
