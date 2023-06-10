/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { SimpleCellAddress } from './Cell';
import { Maybe } from './Maybe';
import { Ast } from './parser';
export interface NamedExpression {
    name: string;
    scope?: number;
    expression?: string;
    options?: NamedExpressionOptions;
}
export declare type NamedExpressionOptions = Record<string, string | number | boolean>;
export declare class InternalNamedExpression {
    displayName: string;
    readonly address: SimpleCellAddress;
    added: boolean;
    options?: Record<string, string | number | boolean> | undefined;
    constructor(displayName: string, address: SimpleCellAddress, added: boolean, options?: Record<string, string | number | boolean> | undefined);
    normalizeExpressionName(): string;
    copy(): InternalNamedExpression;
}
export declare class NamedExpressions {
    static SHEET_FOR_WORKBOOK_EXPRESSIONS: number;
    private nextNamedExpressionRow;
    private readonly workbookStore;
    private readonly worksheetStores;
    private readonly addressCache;
    isNameAvailable(expressionName: string, sheetId?: number): boolean;
    namedExpressionInAddress(row: number): Maybe<InternalNamedExpression>;
    namedExpressionForScope(expressionName: string, sheetId?: number): Maybe<InternalNamedExpression>;
    nearestNamedExpression(expressionName: string, sheetId: number): Maybe<InternalNamedExpression>;
    isExpressionInScope(expressionName: string, sheetId: number): boolean;
    isNameValid(expressionName: string): boolean;
    addNamedExpression(expressionName: string, sheetId?: number, options?: NamedExpressionOptions): InternalNamedExpression;
    restoreNamedExpression(namedExpression: InternalNamedExpression, sheetId?: number): InternalNamedExpression;
    namedExpressionOrPlaceholder(expressionName: string, sheetId: number): InternalNamedExpression;
    workbookNamedExpressionOrPlaceholder(expressionName: string): InternalNamedExpression;
    remove(expressionName: string, sheetId?: number): void;
    getAllNamedExpressionsNamesInScope(sheetId?: number): string[];
    getAllNamedExpressionsNames(): string[];
    getAllNamedExpressions(): {
        expression: InternalNamedExpression;
        scope?: number;
    }[];
    getAllNamedExpressionsForScope(scope?: number): InternalNamedExpression[];
    private worksheetStoreOrCreate;
    private worksheetStore;
    private nextAddress;
}
export declare const doesContainRelativeReferences: (ast: Ast) => boolean;
