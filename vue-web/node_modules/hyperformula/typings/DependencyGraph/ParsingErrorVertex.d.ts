/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { CellError } from '../Cell';
import { ParsingError } from '../parser/Ast';
export declare class ParsingErrorVertex {
    readonly errors: ParsingError[];
    readonly rawInput: string;
    constructor(errors: ParsingError[], rawInput: string);
    getCellValue(): CellError;
    getFormula(): string;
}
