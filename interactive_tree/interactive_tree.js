var data = {
    "name": "Steve",
    "children": [
        {
            "name": "Bob",
            "children": [{ "name": "Jake" },
            { "name": "Janet" },
            { "name": "Mike" }]
        },
        {
            "name": "Blue"
        }]
};

// Define svg container and global variables
var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

var svg = d3.select("body")
    .append("svg")
    .attr("width", 600)
    .attr("height", 700)
    .append("g")
    .attr("transform", d => "translate(50,50)");

let i = 0;
const duration = 950;

// Define base tree layout function
var tree = d3.tree().size([400, 400]);

// Define root and its base coordinates
let root = d3.hierarchy(data, d => d.children);
root.x0 = 280;
root.y0 = 10;

// Display initial tree chart
update(root);

function update(source_node) {
    const treeData = tree(source_node);
    const descendants = treeData.descendants();
    const links = treeData.links();

    // Add paths
    svg.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("d", d => {
            const link = d3.linkVertical()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });

            return link(d);
        })
        .attr("opacity", 0)
        .transition()
        .duration(2000)
        .attr("opacity", d => 1);

    // Add descendants
    const updates = svg.selectAll("g.node")
        .data(descendants, d => d.data.name)
        .enter()
        .append("g")
        .append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .attr("transform", d => `translate(${source_node.x0},${source_node.y0})`)
        .style("fill", "red")
        .on("click", click);

    function click(p1, p2, p3) {
        console.log(p1);
        console.log(p2);
        console.log(p3);
    }

    updates
        .transition()
        .delay((d, i) => { return i * 25 })
        .duration(duration)
        .attr("transform", d => `translate(${d.x},${d.y})`);


    descendants.forEach(node => {
        node.x0 = node.x;
        node.y0 = node.y;
    });

    console.log(descendants);

}