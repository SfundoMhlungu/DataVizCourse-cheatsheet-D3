const select = d3.select
const csv = d3.csv
const scaleLinear = d3.scaleLinear
const scalePoint = d3.scalePoint
const max = d3.max
const axisLeft = d3.axisLeft
const axisBottom = d3.axisBottom
const format = d3.format
const extent = d3.extent

const svg = select("svg");

const width = +svg.attr('width');
const height = +svg.attr('height');




const render = data => {
    // domain is the data scale
    // range is the screen scale(scale to)
    const xValue = d => d.weight;
    const XaxisLabel = "weight";
    const yValue = d => d.horsepower;
    const YaxisLabel = "HorsePower";

    const margin = { top: 60, left: 170, bottom: 100, right: 30 }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const circleRadius = 8;

    const Title = `cars: ${YaxisLabel} vs ${XaxisLabel}`;

    const Xscale = scaleLinear()
        // extent(min and max of the data)
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice(); // from 0 to width of the window

    const Yscale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight]) // from 0 to height of the window
        .nice();
    console.log(Xscale.range())
    console.log(Xscale.domain())


    const g = svg.append("g")
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        //    u can use call with a selction to call a function
        // const xAxisTickFormat = number => format('.3s')(number)
        //     .replace('G', 'B');

    const xAxis = axisBottom(Xscale)

    .tickSize(-innerHeight)
        .tickPadding(15)



    const yAxis = axisLeft(Yscale)
        .tickSize(-innerWidth)
        .tickPadding(10)


    const yAxisG = g.append("g").call(yAxis);
    // rteuns the select
    yAxisG.selectAll('.domain')
        // u can use tlike css selectors
        .remove();


    yAxisG.append("text")
        .attr('class', 'axis-label')
        .attr('y', -80)
        .attr('x', -innerHeight / 2)
        .attr('transform', `rotate(-90)`)
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .text(YaxisLabel)


    const xAxisG = g.append("g").call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG.append("text")
        .attr('class', 'axis-label')
        .attr('y', 74)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(XaxisLabel)


    g.append("text")
        .attr("class", "title")
        .attr('y', -10)
        .text(Title)

    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('cy', d => Yscale(yValue(d)))
        .attr("cx", d => Xscale(xValue(d)))
        .attr("r", circleRadius);
}

csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then(data => {

    data.forEach(element => {
        element.mpg = +element.mpg;
        element.cylinders = +element.cylinders;
        element.displacement = +element.displacement;
        element.horsepower = +element.horsepower;
        element.weight = +element.weight;
        element.acceleration = +element.acceleration;
        element.year = +element.year;
    });

    render(data);
})


// mpg	cylinders	displacement	horsepower	weight	acceleration	year	origin	name