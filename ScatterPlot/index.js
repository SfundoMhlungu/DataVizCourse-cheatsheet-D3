const select = d3.select
const csv = d3.csv
const scaleLinear = d3.scaleLinear
const scalePoint = d3.scalePoint
const max = d3.max
const axisLeft = d3.axisLeft
const axisBottom = d3.axisBottom
const format = d3.format

const svg = select("svg");

const width = +svg.attr('width');
const height = +svg.attr('height');




const render = data => {
    // domain is the data scale
    // range is the screen scale(scale to)
    const xValue = d => d.population
    const yValue = d => d.country
    const margin = { top: 60, left: 170, bottom: 100, right: 30 }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom
    const Xscale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])
        .nice(); // from 0 to width of the window

    const Yscale = scalePoint()
        .domain(data.map(yValue))
        .range([0, innerHeight]) // from 0 to height of the window
        .padding(0.1)

    console.log(Xscale.range())
    console.log(Xscale.domain())


    const g = svg.append("g")
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        //    u can use call with a selction to call a function
    const xAxisTickFormat = number => format('.3s')(number)
        .replace('G', 'B');

    const xAxis = axisBottom(Xscale)
        .tickFormat(xAxisTickFormat)

    .tickSize(-innerHeight)



    const yAxis = axisLeft(Yscale)
        .tickSize(-innerWidth)

    g.append("g").call(yAxis)
        // rteuns the select
        .selectAll('.domain')
        // u can use tlike css selectors
        .remove();

    const xAxisG = g.append("g").call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG.append("text")
        .attr('class', 'axis-label')
        .attr('y', 65)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text('Population')


    g.append("text")
        .attr("class", "title")
        .attr('y', -10)
        .text("top 10 most populos countries")

    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('cy', d => Yscale(yValue(d)))
        .attr("cx", d => Xscale(xValue(d)))
        .attr("r", 10);
}

csv("data.csv").then(data => {

    data.forEach(element => {
        element.population = +element.population * 1000;
    });

    render(data);
})