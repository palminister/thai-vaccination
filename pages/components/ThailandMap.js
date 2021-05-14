import * as d3 from 'd3'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const ThailandMap = (data) => {
  const provinceData = data.data
  const thailandURL =
    'https://raw.githubusercontent.com/apisit/thailand.json/master/thailand.json'
  let thailandData
  const width = '100%'
  const height = 700
  const createSvg = () => {
    return d3
      .select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // .attr('style', 'border: thin white solid')
  }

  const drawChart = (svg) => {
    var size = d3.select('#map').node().offsetWidth > 540 ? 2500 : 2000

    var projection = d3
      .geoMercator()
      .scale(size)
      .rotate([-101.34, -13.2])
      .translate([d3.select('#map').node().offsetWidth / 2, height / 2])

    var path = d3.geoPath(projection)

    var g = svg.append('g')
    var mapLayer = g.append('g').classed('map-layer', true)

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

    // Load Data
    d3.json(thailandURL).then((data, error) => {
      if (error) {
        console.log(error)
      } else {
        thailandData = data.features
        // Draw path
        mapLayer
          .selectAll('path')
          .data(thailandData)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('class', 'province')
          .attr('vector-effect', 'non-scaling-stroke')
          .style('fill', (thailandDataItem) => {
            // console.log('thailandDataItem', thailandDataItem.properties.name)
            let province = provinceData.find((provinceDataItem) => {
              // console.log('thailandDataItem', thailandDataItem.properties.name)
              // console.log('provinceDataItem', provinceDataItem.province)
              return (
                provinceDataItem.province === thailandDataItem.properties.name
              )
            })
            try {
              let provincePercentage = province.relativePercentage
              if (provincePercentage <= 2) {
                return 'white'
              } else if (provincePercentage <= 4) {
                return '#ECFDF5'
              } else if (provincePercentage <= 6) {
                return '#D1FAE5'
              } else if (provincePercentage <= 8) {
                return '#A7F3D0'
              } else if (provincePercentage <= 10) {
                return '#6EE7B7'
              } else {
                return '#34D399'
              }
            } catch (error) {
              console.log(error)
            }
          })
          .attr('data-province', (thailandDataItem) => {
            return thailandDataItem.properties.name
          })
          .attr('data-percentage', (thailandDataItem) => {
            let province = provinceData.find((provinceDataItem) => {
              return (
                provinceDataItem.province === thailandDataItem.properties.name
              )
            })
            try {
              let provincePercentage = province.relativePercentage
              return provincePercentage
            } catch (error) {
              return 'undefined'
            }
          })
          .on('mouseover', (d, thailandDataItem) => {
            let province = provinceData.find((provinceDataItem) => {
              return (
                provinceDataItem.province === thailandDataItem.properties.name
              )
            })
            try {
              tooltip
                .html(
                  `จังหวัด: ${province.provinceTH} <br/>
                   ฉีดวัคซีนแล้ว: ${province.relativePercentage} %`
                )
                .style('visibility', 'visible')
            } catch (error) {
              console.log(error)
            }
            d3.select(event.currentTarget)
              .style('stroke', '#10B981')
              .style('stroke-width', 1.2)
          })
          .on('mousemove', function () {
            tooltip
              .style('top', event.pageY - 10 + 'px')
              .style('left', event.pageX + 10 + 'px')
          })
          .on('mouseout', function () {
            tooltip.html(``).style('visibility', 'hidden')
            d3.select(event.currentTarget).style('stroke', 'none')
          })
      }
    })
  }
  useEffect(() => {
    Aos.init({ duration: 1500, once: true })
    const svg = createSvg()
    drawChart(svg)
  }, [])
  return (
    <div className="w-screen px-5 pt-3 pb-10" data-aos="fade">
      <div className="w-full p-3 bg-gray-800 rounded-xl bg-opacity-20 h-1/2 sm:p-10 lg:px-40">
        <div className="flex w-full">
          <div className="p-5 m-auto text-2xl text-center text-gray-200 font-anuphan">
            <p>
              {' '}
              การฉีดวัคซีนรายจังหวัด <br className="block sm:hidden" />
            </p>
          </div>
        </div>
        <div id="legend" className="max-w-lg m-auto my-2 font-anuphan">
          <div className="flex m-auto">
            <div className="flex-1 bg-white"> </div>
            <div className="flex-1 bg-green-50"> </div>
            <div className="flex-1 bg-green-100"> </div>
            <div className="flex-1 bg-green-200">. </div>
            <div className="flex-1 bg-green-300">. </div>
            <div className="flex-1 bg-green-400">. </div>
          </div>
          <div className="flex py-3 text-center text-white">
            <div className="flex-1">{'<=2%'}</div>
            <div className="flex-1">{'<=4%'}</div>
            <div className="flex-1">{'<=6%'}</div>
            <div className="flex-1">{'<=8%'}</div>
            <div className="flex-1">{'<=10%'}</div>
            <div className="flex-1">{'> 10%'}</div>
          </div>
          <div className="float-right text-xs text-gray-300 font-anuphan">
            <p>* มีการลดทอน scale เพื่อให้เห็นความแตกต่างได้ชัดเจนยิ่งขึ้น</p>
          </div>
        </div>
        <div id="map"></div>
      </div>
    </div>
  )
}
export default ThailandMap
