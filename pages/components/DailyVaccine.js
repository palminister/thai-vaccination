import * as d3 from 'd3'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const DailyVaccine = (data) => {
  data = data.data
  const createSvg = () => {
    return d3
      .select('#chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '500px')
    //   .attr('style', 'border: thin white solid')
  }
  const margin = { top: 20, right: 10, bottom: 50, left: 55 }
  const x = d3.scaleBand().padding(0.1)
  const y = d3.scaleLinear()
  const theData = data

  const drawChart = (svg) => {
    var g = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    g.append('g').attr('class', 'axis axis--x')

    g.append('g').attr('class', 'axis axis--y')

    x.domain(
      data.map(function (d) {
        return d.date
      })
    )
    // Colors
    svg
      .append('linearGradient')
      .attr('id', 'temperature-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0) // min index
      .attr('x2', 0)
      .attr('y2', 450) // max index
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#3B82F6' }, // top
        { offset: '50%', color: '#3B82F6' }, // mid
        { offset: '100%', color: '#DB2777' }, // bottom
      ])
      .enter()
      .append('stop')
      .attr('offset', function (d) {
        return d.offset
      })
      .attr('stop-color', function (d) {
        return d.color
      })

    // Tool Tip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '15px')
      .style('background', 'rgba(0,0,0,0.7)')
      .style('border-radius', '5px')
      .style('color', '#fff')
      .text('a simple tooltip')
      .style('font-family', 'Anuphan')

    // Draw
    var bounds = svg.node().getBoundingClientRect(),
      width = bounds.width - margin.left - margin.right,
      height = bounds.height - margin.top - margin.bottom

    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    g.select('.axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-1em')
      .attr('dy', '-.55em')
      .attr('transform', 'rotate(-90)')
      .style('fill', '#D1D5DB')
      .attr('font-family', 'Anuphan')
      .attr('class', 'hidden sm:block')

    g.select('.axis--x').select('.domain').attr('opacity', '0')

    g.select('.axis--y')
      .call(d3.axisLeft(y.domain([0, 200000])).ticks(4))
      .call((g) => g.select('.domain').remove())

    g.select('.axis--y').selectAll('.tick line').attr('opacity', '0')

    g.select('.axis--y').selectAll('.tick text').style('fill', '#D1D5DB')

    // Enter
    var bars = g.selectAll('.bar').data(theData)
    const rx = 3.7
    const ry = 3.7
    bars
      .enter()
      .append('path')
      .attr(
        'd',
        (d) =>
          `
        M${x(d.date)},${y(parseInt(d.vacRate.replaceAll(',', ''))) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(parseInt(d.vacRate.replaceAll(',', '')))}
        h${-x.bandwidth()}Z
      `
      )
      .attr('fill', 'url(#temperature-gradient)')
      .on('mouseover', function (d, i) {
        tooltip
          .html(
            `วันที่: ${i.date}      <br/>
             จำนวนโดส: ${i.vacRate}`
          )
          .style('visibility', 'visible')
        d3.select(event.currentTarget)
          .style('stroke', 'white')
          .style('stroke-width', 1.2)
        // d3.select(this).attr('fill', '#C7D2FE')
      })
      .on('mousemove', function () {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px')
      })
      .on('mouseout', function () {
        tooltip.html(``).style('visibility', 'hidden')
        d3.select(this).attr('fill', 'url(#temperature-gradient)')
        d3.select(event.currentTarget).style('stroke', 'none')
      })

    // Exit
    bars.exit().remove()
  }

  useEffect(() => {
    Aos.init({ duration: 1500, once: true })
    const svg = createSvg()
    drawChart(svg)
  }, [])

  return (
    <div className="w-screen px-5 pt-3 pb-10" data-aos="fade">
      <div className="w-full p-3 bg-gray-700 rounded-xl bg-opacity-20 h-1/2 sm:p-10 lg:px-40">
        <div className="flex w-full">
          <div className="p-5 m-auto text-2xl text-center text-gray-200 font-anuphan">
            <p>
              อัตราการฉีดวัคซีน <br className="block sm:hidden" />
              (โดส/ วัน)
            </p>
          </div>
        </div>
        <div id="chart"></div>
      </div>
    </div>
  )
}
export default DailyVaccine
