window.onload = function () {

    const data = {
        "name": "1",
        "children": [
            {
                "name": "1.1",
                "children": [{ "name": "1.1.1" },
                { "name": "1.1.2" },
                { "name": "1.1.3" }]
            },
            {
                "name": "1.2"
            }]
    };

    // Creating hierarchal model and getting reference to root node 
    const root = d3.hierarchy(data);

    // Create treeLayout function and setting the size
    const treeLayout = d3.tree().size([580, 80]);

    // Creating a tree model
    let tree = treeLayout(root);

    console.log(tree.descendants());

    // Append children svg circles
    d3.select("svg g#circles")
        .selectAll("circles")
        .data(tree.descendants()) // descendants returns all children nodes
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 7);

    //Append link lines between circles
    d3.select("svg g#lines")
        .selectAll("line")
        .data(tree.links()) // links returns all lines svg coordinates connecting the nodes 
        .enter()
        .append("line")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    d3.select("svg g#info")
        .selectAll("text")
        .data(tree.descendants())
        .enter()
        .append("text")
        .text(d => d.data.name)
        .attr("x", d => d.x + 10)
        .attr("y", d=> d.y + 5)
}