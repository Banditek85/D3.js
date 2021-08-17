var treeData =
{
    "name": "Top Level",
    "children": [
        {
            "name": "Level 2: A",
            "children": [
                { "name": "Son of A" },
                { "name": "Daughter of A" }
            ]
        },
        { "name": "Level 2: B" }
    ]
};

// Set the dimensions and margins of the diagram
var margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("
        + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

var tree = d3.tree().size([height, width]);

root = d3.hierarchy(treeData, function (d) { return d.children; });
root.x0 = width / 2;
root.y0 = 0;

function collapse(d) {
    if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
    }
}

// Collapse after the second level
// root.children.forEach(collapse);

update(root);

function update(source_node) {
    
    console.warn("root");
    console.log(root);

    var _data = tree(root);

    var nodes = _data.descendants(),
        links = _data.links();

    // ?
    nodes.forEach(function (d) { d.y = d.depth * 180 });

    var updateSelection = svg
        .selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i); });


    var enterSelection = updateSelection
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr("transform", function (d) {
            return "translate(" + source_node.y0 + "," + source_node.x0 + ")";})
        .on('click', click);

    enterSelection.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    enterSelection.append('text')
        .attr("dy", ".35em")
        .attr("x", function (d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function (d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function (d) { return d.data.name; });

    var mergedSelection = enterSelection.merge(updateSelection);

    mergedSelection.transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    mergedSelection.select('circle.node')
        .attr('r', 10)
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');

    var nodeExit = updateSelection.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source_node.y + "," + source_node.x + ")";
        })
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    function click(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}