/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange, SimpleCellRange } from '../AbsoluteCellRange';
import { ArraySize } from '../ArraySize';
import { SimpleCellAddress } from '../Cell';
import { RawCellContent } from '../CellContentParser';
import { CellDependency } from '../CellDependency';
import { Config } from '../Config';
import { ContentChanges } from '../ContentChanges';
import { FunctionRegistry } from '../interpreter/FunctionRegistry';
import { InternalScalarValue, InterpreterValue, RawScalarValue } from '../interpreter/InterpreterValue';
import { LazilyTransformingAstService } from '../LazilyTransformingAstService';
import { Maybe } from '../Maybe';
import { NamedExpressions } from '../NamedExpressions';
import { Ast } from '../parser';
import { ColumnsSpan, RowsSpan } from '../Span';
import { Statistics } from '../statistics';
import { ArrayVertex, CellVertex, ParsingErrorVertex, RangeVertex, Vertex } from './';
import { AddressMapping } from './AddressMapping/AddressMapping';
import { ArrayMapping } from './ArrayMapping';
import { Graph, TopSortResult } from './Graph';
import { RangeMapping } from './RangeMapping';
import { SheetMapping } from './SheetMapping';
import { RawAndParsedValue } from './ValueCellVertex';
export declare class DependencyGraph {
    readonly addressMapping: AddressMapping;
    readonly rangeMapping: RangeMapping;
    readonly sheetMapping: SheetMapping;
    readonly arrayMapping: ArrayMapping;
    readonly stats: Statistics;
    readonly lazilyTransformingAstService: LazilyTransformingAstService;
    readonly functionRegistry: FunctionRegistry;
    readonly namedExpressions: NamedExpressions;
    readonly graph: Graph<Vertex>;
    private changes;
    constructor(addressMapping: AddressMapping, rangeMapping: RangeMapping, sheetMapping: SheetMapping, arrayMapping: ArrayMapping, stats: Statistics, lazilyTransformingAstService: LazilyTransformingAstService, functionRegistry: FunctionRegistry, namedExpressions: NamedExpressions);
    /**
     * Invariants:
     * - empty cell has associated EmptyCellVertex if and only if it is a dependency (possibly indirect, through range) to some formula
     */
    static buildEmpty(lazilyTransformingAstService: LazilyTransformingAstService, config: Config, functionRegistry: FunctionRegistry, namedExpressions: NamedExpressions, stats: Statistics): DependencyGraph;
    setFormulaToCell(address: SimpleCellAddress, ast: Ast, dependencies: CellDependency[], size: ArraySize, hasVolatileFunction: boolean, hasStructuralChangeFunction: boolean): ContentChanges;
    setParsingErrorToCell(address: SimpleCellAddress, errorVertex: ParsingErrorVertex): ContentChanges;
    setValueToCell(address: SimpleCellAddress, value: RawAndParsedValue): ContentChanges;
    setCellEmpty(address: SimpleCellAddress): ContentChanges;
    ensureThatVertexIsNonArrayCellVertex(vertex: Maybe<CellVertex>): void;
    clearRecentlyChangedVertices(): void;
    verticesToRecompute(): Set<Vertex>;
    processCellDependencies(cellDependencies: CellDependency[], endVertex: Vertex): void;
    fetchNamedExpressionVertex(expressionName: string, sheetId: number): CellVertex;
    exchangeNode(addressFrom: SimpleCellAddress, addressTo: SimpleCellAddress): void;
    correctInfiniteRangesDependency(address: SimpleCellAddress): void;
    fetchCellOrCreateEmpty(address: SimpleCellAddress): CellVertex;
    removeRows(removedRows: RowsSpan): EagerChangesGraphChangeResult;
    removeSheet(removedSheetId: number): void;
    clearSheet(sheetId: number): void;
    removeColumns(removedColumns: ColumnsSpan): EagerChangesGraphChangeResult;
    addRows(addedRows: RowsSpan): ArrayAffectingGraphChangeResult;
    addColumns(addedColumns: ColumnsSpan): EagerChangesGraphChangeResult;
    ensureNoArrayInRange(range: AbsoluteCellRange): void;
    isThereSpaceForArray(arrayVertex: ArrayVertex): boolean;
    moveCells(sourceRange: AbsoluteCellRange, toRight: number, toBottom: number, toSheet: number): void;
    setArrayEmpty(arrayVertex: ArrayVertex): void;
    addVertex(address: SimpleCellAddress, vertex: CellVertex): void;
    addArrayVertex(address: SimpleCellAddress, vertex: ArrayVertex): void;
    arrayFormulaNodes(): IterableIterator<ArrayVertex>;
    entriesFromRowsSpan(rowsSpan: RowsSpan): IterableIterator<[SimpleCellAddress, CellVertex]>;
    entriesFromColumnsSpan(columnsSpan: ColumnsSpan): IterableIterator<[SimpleCellAddress, CellVertex]>;
    existsVertex(address: SimpleCellAddress): boolean;
    fetchCell(address: SimpleCellAddress): CellVertex;
    getCell(address: SimpleCellAddress): Maybe<CellVertex>;
    getCellValue(address: SimpleCellAddress): InterpreterValue;
    getRawValue(address: SimpleCellAddress): RawCellContent;
    getScalarValue(address: SimpleCellAddress): InternalScalarValue;
    existsEdge(fromNode: Vertex, toNode: Vertex): boolean;
    getSheetId(sheetName: string): number;
    getSheetHeight(sheet: number): number;
    getSheetWidth(sheet: number): number;
    getArray(range: AbsoluteCellRange): Maybe<ArrayVertex>;
    setArray(range: AbsoluteCellRange, vertex: ArrayVertex): void;
    getRange(start: SimpleCellAddress, end: SimpleCellAddress): Maybe<RangeVertex>;
    topSortWithScc(): TopSortResult<Vertex>;
    markAsVolatile(vertex: Vertex): void;
    markAsDependentOnStructureChange(vertex: Vertex): void;
    forceApplyPostponedTransformations(): void;
    volatileVertices(): Set<Vertex>;
    getArrayVerticesRelatedToRanges(ranges: RangeVertex[]): Set<ArrayVertex>;
    rawValuesFromRange(range: AbsoluteCellRange): IterableIterator<[RawScalarValue, SimpleCellAddress]>;
    entriesFromRange(range: AbsoluteCellRange): IterableIterator<[SimpleCellAddress, Maybe<CellVertex>]>;
    exchangeGraphNode(oldNode: Vertex, newNode: Vertex): void;
    exchangeOrAddGraphNode(oldNode: Maybe<Vertex>, newNode: Vertex): void;
    dependencyQueryAddresses: (vertex: Vertex) => (SimpleCellAddress | SimpleCellRange)[];
    dependencyQueryVertices: (vertex: Vertex) => Vertex[];
    computeListOfValuesInRange(range: AbsoluteCellRange): InternalScalarValue[];
    shrinkArrayToCorner(array: ArrayVertex): void;
    isArrayInternalCell(address: SimpleCellAddress): boolean;
    getAndClearContentChanges(): ContentChanges;
    getAdjacentNodesAddresses(inputVertex: Vertex): (SimpleCellRange | SimpleCellAddress)[];
    private correctInfiniteRangesDependenciesByRangeVertex;
    private cleanAddressMappingUnderArray;
    private formulaDirectDependenciesToArray;
    private rangeDirectDependenciesToArray;
    private adjacentArrayVertices;
    private rangeDependencyQuery;
    private formulaDependencyQuery;
    private addStructuralNodesToChangeSet;
    private fixRangesWhenAddingRows;
    private addAllFromRange;
    private fixRangesWhenAddingColumns;
    private exchangeOrAddFormulaVertex;
    private setAddressMappingForArrayVertex;
    private truncateRanges;
    private fixArraysAfterAddingRow;
    private fixArraysAfterRemovingRows;
    private fixArraysAfterAddingColumn;
    private fixArraysAfterRemovingColumns;
    private shrinkPossibleArrayAndGetCell;
    private setNoSpaceIfArray;
    private removeVertex;
    private mergeRangeVertices;
    private removeVertexAndCleanupDependencies;
}
export interface ArrayAffectingGraphChangeResult {
    affectedArrays: Set<ArrayVertex>;
}
export interface EagerChangesGraphChangeResult extends ArrayAffectingGraphChangeResult {
    contentChanges: ContentChanges;
}
