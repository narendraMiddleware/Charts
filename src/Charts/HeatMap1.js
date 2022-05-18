import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from 'axios';
import './heatmapstyle.css'

export default function HeatMap(props) {
        const {classnameCustom} = props;
        let [width, setWidth] = useState(400);
        let [height, setHeight] = useState(300);
        useEffect(() => {
          props.setRefreshFunction((a) => refreshMe);
        }, []);

        function refreshMe(a,b) {
          console.log(a,b);
          // setWidth(b);
          // setHeight(a);
        };


        setTimeout(() => {
          console.log("Inside");
          // setWidth(350);
          // setHeight(250);
          window.dispatchEvent(new Event('resize'));
        },1000)

        useEffect(() => {
          const data = props.data.monthlyVariance,
                baseTemperature = props.data.baseTemperature,
                yearRange = d3.extent(data, d => {return d.year; });
                console.log(data, d => {return d.year; });

          console.log(data,"-----------",baseTemperature,"==============",yearRange,"**************");
          
          const legendData = [
            {'interval': 2.7, 'color': '#990000'},
            {'interval': 3.9, 'color': '#A91710'},
            {'interval': 6.1, 'color': '#B92E20'},
            {'interval': 7.2, 'color': '#C94631'},
            {'interval': 8.3, 'color': '#D95D41'},
            {'interval': 9.4, 'color': '#E97451'},
            {'interval': 10.5, 'color': '#e97451cc'},
            {'interval': 11.6, 'color': '#e974518c'},
            {'interval': 12.8, 'color': '#e9745138'}
          ];
          let margins = {top:20, right: 50, bottom: 100, left: 100};

          const colorScheme = ["#0868ac", "#43a2ca", "#7bccc4", "#bae4bc", "#fcebb5", "#fe9929", "#d95f0e", "#993404"];

          const yScale = d3.scaleLinear()
            .range([height,0])
            .domain([12,0]);
          
          const xScale = d3.scaleLinear()
            .range([0,width])
            .domain(d3.extent(data, d => {return d.year; }));

            const chart = d3.select('#heat_map')
              .attr("viewBox", `0 0 ${width} ${height}`);
            const tooltip = d3.select("#tooltip");
          
          // const chart = d3.select('.chart')
          //   .attr('width', width + margins.right + margins.left)
          //   .attr('height', height + margins.top + margins.bottom)
          //   .append('g')
          //   .attr('class',classnameCustom)
          //   .attr('transform','translate(' + margins.left + ',' + margins.top + ')');
          
          // const tooltip = d3.select('.container').append('div')
          //   .attr('class','tooltip')
          //   .html('Tooltip')
          
          const barWidth = width / 17,
                barHeight = height / 12;
          
          const colorScale = d => {
            for (let i = 0; i < legendData.length; i++) {
              if (d.variance + baseTemperature < legendData[i].interval) {
                return legendData[i].color;
              }
            }
            return 'darkred';
          };
          
          const timeParseFormat = d => {
            if (d === 0) return '';
            return d3.timeFormat('%b')(d3.timeParse('%m')(d));
          };
          
          chart.selectAll('g')
            .data(data).enter().append('g')
            .append('rect')
            .attr('x', d => {return (d.year - yearRange[0]) * barWidth})
            .attr('y', d => {return (d.month - 1) * barHeight})
            .style('fill', colorScale)
            .attr('width', barWidth)
            .attr('height', barHeight)
            .on('mouseover', d => {
              tooltip.html(timeParseFormat(d.month) + ' ' + d.year + '<br/>' +
                d3.format('.4r')(baseTemperature + d.variance) + ' &degC<br/>' + d.variance + ' &degC' )
                .style('left', d3.event.pageX - 35 + 'px')
                .style('top', d3.event.pageY - 73 + 'px')
                .style('opacity', .9);
            }).on('mouseout', () => {
              tooltip.style('opacity', 0)
                .style('left', '0px');
            });
          
          chart.append('g')
            .attr('transform','translate(0,' + height + ')')
            .call(d3.axisBottom(xScale).tickFormat(d3.format('.4')));
          
          chart.append('g')
            .attr('transform','translate(0,-' + barHeight / 2 + ')')
            .call(d3.axisLeft(yScale).tickFormat(timeParseFormat))
            .attr('class','yAxis');
          
          chart.append('text')
            .attr('transform','translate(-40,' + (height / 2)  + ') rotate(-90)')
            .style('text-anchor','middle')
            .style('fill','white')
            .text('Month');
          
          chart.append('text')
            .attr('transform','translate(' + (width / 2) + ',' + (height + 40) + ')')
            .style('text-anchor','middle')
            .style('fill','white')
            .text('Year');
          
          }, [])
          
      const [svgWidthHeight, setSvgWidthHeight] = useState({width:627,height:350});
      return(
          
        <div id="main">
        <svg className={props.classnameCustom} id="heat_map"/>
          <div id="tooltip">
              <div id="container">
                  <span id="month-span" className="span">Month</span> - 
                  <span id="year-span" className="span">Year</span>
                  <span id="temp-span" className="span">Temp</span>℃
                  Variance: <span id="var-span" className="span">num</span>
              </div>
          </div>
        </div>

      );
  }