/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { SimpleCellAddress } from '../../Cell';
import { RawCellContent } from '../../CellContentParser';
import { InterpreterValue } from '../../interpreter/InterpreterValue';
import { Maybe } from '../../Maybe';
import { Sheet, SheetBoundaries } from '../../Sheet';
import { ColumnsSpan, RowsSpan } from '../../Span';
import { CellVertex } from '../Vertex';
import { ChooseAddressMapping } from './ChooseAddressMappingPolicy';
import { IAddressMappingStrategy } from './IAddressMappingStrategy';
export declare class AddressMapping {
    private readonly policy;
    private mapping;
    constructor(policy: ChooseAddressMapping);
    /** @inheritDoc */
    getCell(address: SimpleCellAddress): Maybe<CellVertex>;
    fetchCell(address: SimpleCellAddress): CellVertex;
    strategyFor(sheetId: number): IAddressMappingStrategy;
    addSheet(sheetId: number, strategy: IAddressMappingStrategy): void;
    autoAddSheet(sheetId: number, sheet: Sheet, sheetBoundaries: SheetBoundaries): void;
    getCellValue(address: SimpleCellAddress): InterpreterValue;
    getRawValue(address: SimpleCellAddress): RawCellContent;
    /** @inheritDoc */
    setCell(address: SimpleCellAddress, newVertex: CellVertex): void;
    moveCell(source: SimpleCellAddress, destination: SimpleCellAddress): void;
    removeCell(address: SimpleCellAddress): void;
    /** @inheritDoc */
    has(address: SimpleCellAddress): boolean;
    /** @inheritDoc */
    getHeight(sheetId: number): number;
    /** @inheritDoc */
    getWidth(sheetId: number): number;
    addRows(sheet: number, row: number, numberOfRows: number): void;
    removeRows(removedRows: RowsSpan): void;
    removeSheet(sheetId: number): void;
    addColumns(sheet: number, column: number, numberOfColumns: number): void;
    removeColumns(removedColumns: ColumnsSpan): void;
    verticesFromRowsSpan(rowsSpan: RowsSpan): IterableIterator<CellVertex>;
    verticesFromColumnsSpan(columnsSpan: ColumnsSpan): IterableIterator<CellVertex>;
    entriesFromRowsSpan(rowsSpan: RowsSpan): IterableIterator<[SimpleCellAddress, CellVertex]>;
    entriesFromColumnsSpan(columnsSpan: ColumnsSpan): IterableIterator<[SimpleCellAddress, CellVertex]>;
    entries(): IterableIterator<[SimpleCellAddress, Maybe<CellVertex>]>;
    sheetEntries(sheet: number): IterableIterator<[SimpleCellAddress, CellVertex]>;
}
