/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { SimpleCellAddress } from '../Cell';
import { EmptyValueType } from '../interpreter/InterpreterValue';
/**
 * Represents singleton vertex bound to all empty cells
 */
export declare class EmptyCellVertex {
    address: SimpleCellAddress;
    constructor(address: SimpleCellAddress);
    /**
     * Retrieves cell value bound to that singleton
     */
    getCellValue(): EmptyValueType;
}
