/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
export declare type DependencyQuery<T> = (vertex: T) => T[];
export interface TopSortResult<T> {
    sorted: T[];
    cycled: T[];
}
/**
 * Provides graph directed structure
 *
 * Invariants:
 * - this.edges(node) exists if and only if node is in the graph
 * - this.specialNodes* are always subset of this.nodes
 * - this.edges(node) is subset of this.nodes (i.e. it does not contain nodes not present in graph) -- this invariant DOES NOT HOLD right now
 */
export declare class Graph<T> {
    private readonly dependencyQuery;
    /** Set with nodes in graph. */
    nodes: Set<T>;
    specialNodes: Set<T>;
    specialNodesStructuralChanges: Set<T>;
    specialNodesRecentlyChanged: Set<T>;
    infiniteRanges: Set<T>;
    /** Nodes adjacency mapping. */
    private edges;
    constructor(dependencyQuery: DependencyQuery<T>);
    /**
     * Adds node to a graph
     *
     * @param node - a node to be added
     */
    addNode(node: T): void;
    /**
     * Adds edge between nodes.
     *
     * The nodes had to be added to the graph before, or the error will be raised
     *
     * @param fromNode - node from which edge is outcoming
     * @param toNode - node to which edge is incoming
     */
    addEdge(fromNode: T, toNode: T): void;
    removeEdge(fromNode: T, toNode: T): void;
    softRemoveEdge(fromNode: T, toNode: T): void;
    removeIncomingEdges(toNode: T): void;
    /**
     * Returns nodes adjacent to given node
     *
     * @param node - node to which adjacent nodes we want to retrieve
     */
    adjacentNodes(node: T): Set<T>;
    adjacentNodesCount(node: T): number;
    /**
     * Checks whether a node is present in graph
     *
     * @param node - node to check
     */
    hasNode(node: T): boolean;
    /**
     * Returns number of nodes in graph
     */
    nodesCount(): number;
    /**
     * Returns number of edges in graph
     */
    edgesCount(): number;
    removeNode(node: T): T[];
    markNodeAsSpecial(node: T): void;
    markNodeAsSpecialRecentlyChanged(node: T): void;
    markNodeAsChangingWithStructure(node: T): void;
    clearSpecialNodesRecentlyChanged(): void;
    markNodeAsInfiniteRange(node: T): void;
    /**
     * Checks whether exists edge between nodes
     *
     * @param fromNode - node from which edge is outcoming
     * @param toNode - node to which edge is incoming
     */
    existsEdge(fromNode: T, toNode: T): boolean;
    topSortWithScc(): TopSortResult<T>;
    /**
     *
     * an iterative implementation of Tarjan's algorithm for finding strongly connected compontents
     * returns vertices in order of topological sort, but vertices that are on cycles are kept separate
     *
     * @param modifiedNodes - seed for computation. During engine init run, all of the vertices of grap. In recomputation run, changed vertices.
     * @param operatingFunction - recomputes value of a node, and returns whether a change occured
     * @param onCycle - action to be performed when node is on cycle
     */
    getTopSortedWithSccSubgraphFrom(modifiedNodes: T[], operatingFunction: (node: T) => boolean, onCycle: (node: T) => void): TopSortResult<T>;
    getDependencies(vertex: T): T[];
    private removeDependencies;
}
