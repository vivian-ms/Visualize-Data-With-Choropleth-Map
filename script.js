const urls = {
  education: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
  county: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
};
const w = 900;
const h = 500;
const padding = 100;
const colors = [
// '#f7fbff',  (Too light, don't use)
  '#deebf7',
  '#c6dbef',
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  '#084594'
];  // Source: https://colorbrewer2.org/?type=sequential&scheme=Blues&n=8


window.onload = () => {
  Promise.all([
    fetch(urls.education),
    fetch(urls.county)
  ]).then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      createCanvas(data);
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });

};  // End window.onload()


function createCanvas(data) {
  let svg = d3.select('#svg_container')
              .append('svg')
              .attr('width', w + 2 * padding)
              .attr('height', h + 2 * padding)
              .append('g')
              .attr('transform', `translate(${padding}, ${padding / 10})`);

  createMap(svg, data);
}  // End createCanvas()


function createMap(svg, data) {
  let path = d3.geoPath();

  let colorScale = d3.scaleQuantize()
                     .domain([
                       d3.min(data[0], d => d.bachelorsOrHigher),
                       d3.max(data[0], d => d.bachelorsOrHigher)
                     ])
                     .range(colors);

  svg.selectAll('path')
     .data(topojson.feature(data[1], data[1].objects.counties).features)
     .enter()
     .append('path')
     .attr('d', path)
     .attr('stroke', 'grey')
     .attr('stroke-width', '0.01rem')
     .attr('fill', d => colorScale(data[0].find(obj => obj.fips === d.id).bachelorsOrHigher))
     .attr('data-fips', d => d.id)
     .attr('data-education', d => data[0].find(obj => obj.fips === d.id).bachelorsOrHigher)
     .classed('county', true);

  svg.append('path')
     .datum(topojson.mesh(data[1], data[1].objects.states, (a, b) => a !== b))
     .attr('d', path)
     .attr('stroke', 'white')
     .attr('stroke-linejoin', 'round')
     .attr('fill', 'none')
     .classed('state', true);
}  // End createMap()
