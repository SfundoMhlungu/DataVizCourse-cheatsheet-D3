const select = d3.select
const csv = d3.csv
const scaleLinear = d3.scaleLinear
const scalePoint = d3.scalePoint
const max = d3.max
const axisLeft = d3.axisLeft
const axisBottom = d3.axisBottom
const format = d3.format
const extent = d3.extent
const scaleTime = d3.scaleTime
const line = d3.line
const curveBasis = d3.curveBasis

const svg = select("svg");

const width = +svg.attr('width');
const height = +svg.attr('height');




const render = data => {
    // domain is the data scale
    // range is the screen scale(scale to)
    const xValue = d => d.timestamp;
    const XaxisLabel = "Time";
    const yValue = d => d.temperature;
    const YaxisLabel = "Temperature";

    const margin = { top: 60, left: 170, bottom: 100, right: 30 }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const circleRadius = 6;

    const Title = `cars: ${YaxisLabel} vs ${XaxisLabel}`;

    const Xscale = scaleTime()
        // extent(min and max of the data)
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice(); // from 0 to width of the window

    const Yscale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0]) // from 0 to height of the window
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
        .text(Title);


    const lineGenerator = line()
        .x(d => Xscale(xValue(d)))
        .y(d => Yscale(yValue(d)))
        .curve(curveBasis);


    g.append("path")
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data));




}


csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
    .then(data => {
        data.forEach(d => {
            d.temperature = +d.temperature;
            d.timestamp = new Date(d.timestamp);
        });
        render(data);



    });

// mpg	cylinders	displacement	horsepower	weight	acceleration	year	origin	name