let selection = d3.select("#events")
    .selectAll("p")
    .data([{name: "Ryu"}, {name: "Ken"}, {name: "Chun Li"}])
    .enter()
    .append("p")
    .html(d => d.name);

selection.on("click", click);

function click(p_event, p_d ) {
    console.log(p_event);
    console.log(p_d.name);
}