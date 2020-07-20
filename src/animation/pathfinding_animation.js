export function animate(comp, nodes, path) {
    for (let i = 0; i < nodes.length - 1; i++) {
        setTimeout(() => {
            animateVisitedNodes(comp, nodes, i);
            comp.$forceUpdate();
            if (i === nodes.length - 2) {
                for (let i = 0; i < path.length; i++) {
                    setTimeout(() => {
                        animatePathNodes(comp, path, i);
                        comp.$forceUpdate();
                    }, i * comp.startVisualisation.speed.pathSpeed);
                    if (i === path.length - 1) {
                        comp.$emit("visualisationIsDone");
                        comp.$emit("executionStats", comp.stats);
                        comp.isSynced = true;
                    }
                }
            }
        }, i * comp.startVisualisation.speed.nodesSpeed);
    }
}

export function sync(comp, nodes, path) {
    for (let i = 0; i < nodes.length - 1; i++) {
        syncVisitedNodes(comp, nodes, i)
        if (i === nodes.length - 2) {
            for (let i = 0; i < path.length; i++) {
                syncPathNodes(comp, path, i)
            }
        }
        comp.$forceUpdate();
    }
}

function animateVisitedNodes(comp, nodes, i) {
    if (i === 0) {
        if (
            comp.gridMatrix[nodes[i].row][nodes[i].col].type ===
            "tmp_startNode"
        ) {
            comp.gridMatrix[nodes[i].row][nodes[i].col].type =
                "tmp-start-node";
        } else {
            comp.gridMatrix[nodes[i].row][nodes[i].col].type = "start-node";
        }
    } else {
        comp.gridMatrix[nodes[i].row][nodes[i].col].type = "path";
        setTimeout(() => {
            comp.gridMatrix[nodes[i].row][nodes[i].col].type = "node-path";
        }, 20);
    }
}

function animatePathNodes(comp, path, i) {
    if (i === path.length - 1) {
        if (
            comp.gridMatrix[path[i].row][path[i].col].type ===
            "tmp_targetNode"
        ) {
            comp.gridMatrix[path[i].row][path[i].col].type =
                "tmp-target-node";
        } else {
            comp.gridMatrix[path[i].row][path[i].col].type =
                "target-node";
        }
    } else if (i === 0) {
        if (
            comp.gridMatrix[path[i].row][path[i].col].type ===
            "tmp-start-node"
        ) {
            comp.gridMatrix[path[i].row][path[i].col].type =
                "tmp-start-node-path";
        } else {
            comp.gridMatrix[path[i].row][path[i].col].type =
                "start-node-path";
        }
    } else {
        comp.gridMatrix[path[i].row][path[i].col].type = "path";
    }
}

function syncVisitedNodes(comp, nodes, i) {
    if (i === 0) {
        if (
            comp.gridMatrix[nodes[i].row][nodes[i].col].type === "tmp_startNode"
        ) {
            comp.gridMatrix[nodes[i].row][nodes[i].col].type =
                "tmp-start--node";
        } else {
            comp.gridMatrix[nodes[i].row][nodes[i].col].type = "start--node";
        }
    } else {
        comp.gridMatrix[nodes[i].row][nodes[i].col].type = "node--path";
    }
}

function syncPathNodes(comp, path, i) {
    if (i === path.length - 1) {
        if (
            comp.gridMatrix[path[i].row][path[i].col].type ===
            "tmp_targetNode"
        ) {
            comp.gridMatrix[path[i].row][path[i].col].type =
                "tmp-target--node";
        } else {
            comp.gridMatrix[path[i].row][path[i].col].type = "target--node";
        }
    } else if (i === 0) {
        if (
            comp.gridMatrix[path[i].row][path[i].col].type ===
            "tmp-start-node"
        ) {
            comp.gridMatrix[path[i].row][path[i].col].type =
                "tmp-start-node--path";
        } else {
            comp.gridMatrix[path[i].row][path[i].col].type =
                "start-node--path";
        }
    } else {
        comp.gridMatrix[path[i].row][path[i].col].type = "-path";
    }
}