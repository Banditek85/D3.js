const list = d3.select("#list");

/* D3 data function binds particular dataset object that is passed as parameter with particular D3 selection of DOM elements - data join. This gives us access to three new selections: update, enter and exit. Data function returns 
the update selection, enter and exit selections hang of this update selection. */

/* Data function can receive key function as a second argument, which defines which datum is assigned to which DOM element by returning unique string identifier. If no key function is provided, the default join-by-index is used. */

list.selectAll("li")
    .data([10,20,30,40])
    .html(function(item) {
        return "<b>This is existing element</b>: " + item;
    }).enter()  // Enter method represents elements 
    .append("li")
    .text(function(item) {
        return "This is appended element from data: " + item;
    })

list.selectAll("li")
    .data([10,20,30])
    .exit()
    .remove();

const svg = d3.select("svg");
svg.selectAll("rect")
.data([{x: 20, y: 30, width: 50, height: 100, fill: "green"},
       {x: 50, y: 40, width: 10, height: 200, fill: "red"}])
.enter() /* D3 compares number of elements from 'selectall' call with number of elements
          from bound data set. Any leftover elements from dataset are stored in 'enter' selection. Similarly any missing elements are stored in 'exit' selection. */
.append("rect")
.attr("x", r => r.x)
.attr("y", r => r.y)
.attr("fill", r => r.fill)
.attr("width", r => r.width)
.attr("height", r => r.height);

let i = 0;
const events_div = d3.selectAll("#events div p")
    .data([{name: "mike"},{name: "Casius"},{name: "Evander"}], d => (d.id = ++i))
    .html(d => d.name);

    function click(p_1, p_2, p_3) {
        console.warn("parameters: ");
        console.log(p_1);
        console.log(p_2);
        console.log(p_3);
    }   

// Scales and bar chart

// When defining a scale, you define 2 type of ranges: 'domain' (input values) and 'range' (output values) 
// where you define minimum and maximum values for each.
const widthScale = d3.scaleLinear()
    .domain([0,60])
    .range([0,400]);


const colorScale = d3.scaleLinear()
    .domain([0,60])
    .range(["lightblue", "darkblue"]);


// creating axis
const axis = d3.axisTop(widthScale);


// Append method appends named element as last child of current selection and returns collection of these newly 
// created element(s). attr function returns current selection.
const scales = d3.select("#scales")
    .append("svg")
        .attr("width", 420)
        .attr("height", 220)
    .append("g")
    .attr("transform", "translate(10,20)")
    .call(axis);

const bars = [20, 40, 50, 60];

// Define bars
scales.selectAll("rect")
    .data(bars)
    .enter()
    .append("rect")
        .attr("width", d => widthScale(d)) // D3 scales are functions 
        .attr("height", d => 49)
        .attr("y", (d, i) => i * 50)
        .attr("fill", (d) => colorScale(d))
        .attr("transform", "translate(0,5)");