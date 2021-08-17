let selection = d3.select("#events")
    .selectAll("p")
    .data([{}, {}, {}])
    .enter()
    .append("p")
    .html("hello");



selection.on("click", click);




function click(p1, p2, p3) {
    console.log(p1);
    console.log(p2);
    console.log(p3);
}