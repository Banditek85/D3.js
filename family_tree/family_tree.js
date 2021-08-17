const svg = d3.select("body")
    .append("svg")
    .attr("width", 600)
    .attr("height", 900)
    .append("g")
    .attr("transform", "translate(50,50)");

// Unlike previouse examples, data not in hierarchical format
const data = [
    { child: "John", parent: "" },
    { child: "Aaron", parent: "Kevin" },
    { child: "Kevin", parent: "John", spouse: "Eva" },
    { child: "Hannah", parent: "Ann" },
    { child: "Rose", parent: "Sarah" },
    { child: "Ann", parent: "John", spouse: "Jacob" },
    { child: "Sarah", parent: "Kevin", spouse: "Mikey" },
    { child: "Mark", parent: "Ann" },
    { child: "Angel", parent: "Sarah" }
];

/* d3.stratify function returns a function, that we can apply to
flat (not hierarchical) lists of data and get hierarchical d3 model to 
work with. We specify id and parentId property functions which define
how to construct the hierarchy */

const stratify = d3.stratify()
    .id(d => d.child)
    .parentId(d => d.parent);

// Pass flat data to our stratify function
const root = stratify(data);

// Declare tree variable by calling d3.tree and pass root model as argument
const tree = d3.tree().size([600, 500])(root);
root.x = 20;

console.warn("root: ");
console.log(root);

console.warn("descendats: ");
console.log(tree.descendants());

console.warn("links: ");
console.log(tree.links());

// Append/draw bezier curves as connection lines
svg.append("g")
    .selectAll("path")
    .data(tree.links())
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
    });

// Append/draw circles
// svg.append("g")
//     .selectAll("circle")
//     .data(tree.descendants())
//     .enter()
//     .append("circle")
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y)
//         .attr("r", 35);


//Append/draw rectangles 
// svg.append("g")
//     .selectAll("rect")
//     .data(tree.descendants())
//     .enter()
//     .append("rect")
//     .attr("x", d => d.x - 40)
//     .attr("y", d => d.y - 20)
//     .on("mousedown", d => {
//         d3.select("#details")
//             .style("visibility", "visible")
//             .html(function () {
//                 if (d.data.spouse != undefined) {
//                     return "Spouse: " + d.data.spouse;
//                 } else { return "No spouse" }
//             })
//     })
//     .on("mouseup", d => {
//         d3.select("#details").style("visibility", "hidden");
//     });

// Append/draw names
svg.append("g")
    .selectAll("text")
    .data(tree.descendants())
    .enter()
    .append("text")
    .text(d => d.data.child)
    .attr("x", d => d.x- 10)
    .attr("y", d => d.y)
    .attr("stroke", "darkblue")
    .attr("font-size", "12");

// append logos
svg.append("g")
    .selectAll("image")
    .data(tree.descendants())
    .enter()
    .append("image")
    .attr("href", d => {
        return "./user.png"
    })
    .attr("id", "logo_id")
    .attr("x", d => d.x - 19)
    .attr("y", d => d.y - 50);