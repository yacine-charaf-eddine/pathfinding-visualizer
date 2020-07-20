export function a_star(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristicDistance = manhattanDistance(startNode, finishNode)
    startNode.totalDistance = startNode.distance + startNode.heuristicDistance;
    const unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length > 0) {
        let closest = sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes[closest];
        if (closestNode.totalDistance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        unvisitedNodes.splice(unvisitedNodes.indexOf(closestNode), 1);
        updateUnvisitedNeighbors(closestNode, finishNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    var closest = 0;
    for (var i = 1; i < unvisitedNodes.length; i++) {
        if (unvisitedNodes[i].totalDistance < unvisitedNodes[closest].totalDistance) {
            closest = i;
        }
        //if we have a tie according to the standard heuristic
        if (unvisitedNodes[i].totalDistance === unvisitedNodes[closest].totalDistance) {
            //Prefer to explore options with longer known paths (closer to goal)
            if (unvisitedNodes[i].distance > unvisitedNodes[closest].distance) {
                closest = i;
            }
        }
    }
    return closest;
}

function updateUnvisitedNeighbors(node, finishNode, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.type === 'wallNode') continue;
        let tentative_distance = node.distance + 1;
        if (tentative_distance >= neighbor.distance) {
            // No, it's not a better path
            continue;
        }
        neighbor.heuristicDistance = manhattanDistance(neighbor, finishNode);
        neighbor.distance = tentative_distance;
        neighbor.totalDistance = tentative_distance + neighbor.heuristicDistance;
        neighbor.previousParent = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {
        col,
        row
    } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]); // up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
    if (col > 0) neighbors.push(grid[row][col - 1]); // left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); //right
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function manhattanDistance(node, targetNode) {
    return Math.abs(node.col - targetNode.col) + Math.abs(node.row - targetNode.row);
}


export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousParent;
    }
    return nodesInShortestPathOrder;
}