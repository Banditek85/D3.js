// Define the data for the tree
const family = {
    "name": "Eve",
    "children": [
      {
        "name": "Cain"
      },
      {
        "name": "Seth",
        "children": [
          {
            "name": "Enos"
          },
          {
            "name": "Noam"
          }
        ]
      },
      {
        "name": "Abel"
      },
      {
        "name": "Awan",
        "children": [
          {
            "name": "Enoch"
          }
        ]
      },
      {
        "name": "Azura"
      }
    ]
  };

const svg = d3.select("body")
    .append("svg")
        .attr("width", 400)
        .attr("height", 300)
        .append("g");

// Define tree root
const root = d3.hierarchy(family);
console.log(root);

