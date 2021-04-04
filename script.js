const urls = {
  education: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
  county: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
};
const w = 900;
const h = 500;
const padding = 100;


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
}  // End createCanvas()
