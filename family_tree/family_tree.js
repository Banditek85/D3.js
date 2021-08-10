const svg = d3.select("body")
    .append("svg")
    .attr("width", 650)
    .attr("height", 600)
    .append("g")
    .attr("transform","translate(50,50)");

// Unlike previouse examples, data not in hierarchical format
const data = [
    {child: "John",  parent: ""},
    {child: "Aaron", parent: "Kevin"},
    {child: "Kevin", parent: "John"},
    {child: "Hannah",parent: "Ann"},
    {child: "Rose",  parent: "Sarah"},
    {child: "Ann",   parent: "John"},
    {child: "Sarah", parent: "Kevin"},
    {child: "Mark",  parent: "Ann"},
    {child: "Angel", parent: "Sarah"}
];

/* d3.stratify function returns a function, that we can apply to
flat (not hierarchical) lists of data and get hierarchical d3 model to 
work with. We specify id and parentId property functions which define
how to construct the hierarchy */

const stratify = d3.stratify()
    .id(d => d.child)
    .parentId(d => d.parent);

// Pass flat data to our stratify function
const hierarchy = stratify(data);

// Declare tree variable by calling d3.tree and pass hierarchy model as argument
const tree = d3.tree().size([640,300])(hierarchy);
console.log(tree.descendants());
console.log(tree.links());

// Append/draw bezier curves as connection lines
// svg.append("g")
//     .selectAll("path")
//     .data(tree.links())
//     .enter()
//     .append("path")
//     .attr("d", d => "M " + d.source.x + "," + d.source.y + 
//           " C " + d.source.x + "," + ((d.source.y + d.source.y)/2).toFixed(2) 
//           + " " + d.target.x + "," + ((d.source.y + d.target.y)/2).toFixed(2) 
//           + " " + d.target.x + "," + d.target.y);

// Append/draw circles
// svg.append("g")
//     .selectAll("circle")
//     .data(tree.descendants())
//     .enter()
//     .append("circle")
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y)
//         .attr("r", 10);


//Append/draw rectangles 
svg.append("g")
    .selectAll("rect")
    .data(tree.descendants())
    .enter()
    .append("rect")
        .attr("x", d => d.x- 40)
        .attr("y", d => d.y- 20);

// Append/draw names
svg.append("g")
    .selectAll("text")
    .data(tree.descendants())
    .enter()
    .append("text")
    .text(d => d.data.child)
        .attr("x", d => d.x - 18)
        .attr("y", d => d.y + 4);
