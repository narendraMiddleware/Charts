import React, { Component, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { random } from 'lodash';

const transitionDuration = 0;
const h = Math.sqrt(3) / 2;
const r = 30;

function buildHexPath(x = 0, y = 0) {
  return d3.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveCardinalClosed.tension('0.8'))([
      { x: r + x, y },
      { x: r / 2 + x, y: r * h + y },
      { x: -r / 2 + x, y: r * h + y },
      { x: -r + x, y },
      { x: -r / 2 + x, y: -r * h + y },
      { x: r / 2 + x, y: -r * h + y }
    ]);
}
const hexPath = buildHexPath();

function buildHexData(data, cols = 6, rows = 6) {
  const jsonCount = data.data.length;
  const hexes = [];
  let rowCount = jsonCount < 9 ? 2 : 4; 
  let tempCount = 0;
  for (let i = 0; i < rowCount; i++) {
    for (let j = i%2; j < (rowCount < 3 ? jsonCount : jsonCount/2); j+=2 ) {
      tempCount += 1;
      if(tempCount > jsonCount){
        console.log("Stop");
      } else {
        hexes.push({
          active: data.data[j].status,
          col: j,
          row: i
        });
      }
      
    }
  }
  return hexes;
}

function hexFill(d) {
  return d.active == 'working' ? '#158a00b5' : d.active == 'pending' ? '#808080' : d.active == 'stop' ? '#b70000cf' : d.active == 'lowrunning' ? '#d9c600' : '#7afff761';
}



export default class Hexagons extends Component {
  constructor(props) {
    super(props);
    this.state = { hexData: buildHexData(this.props),newwidth : 0 };
      props.setRefreshFunctionSC(this.refreshMe);

    }
  
  
  refreshMe = (a,b) => {
    this.temp(a,b)
    this.state.newwidth = b;
    // setWidth(b);
    // setHeight(a);
  };
  
  componentDidMount() {
    this.hexGroup = d3.select(this.svg).append('g');
    this.hexGroup.selectAll('.hex')
      .data(this.state.hexData)
      .enter()
      .append('svg:a')
        .attr('class', 'hex')
        .attr('href', '')
        .on('click', d => {
          d3.event.preventDefault();
          d3.event.stopPropagation();
        })
        .append('path')
          .attr('d', hexPath)
          .attr('fill', hexFill)
          .attr('stroke', 'red')
          .attr('stroke-width', 2)
          .attr('transform', (d,i) => {
            const cx = (d.col * 20 * 1.75) + (5 % 4 ? r * 1 : r);
            const chartPosition = this.props.data.length < 10 ? 50 : 100;
            const cy = (d.row * r * 1.75) + (r + chartPosition);
            return `translate(${cx}, ${cy}) rotate(90 0 0)`;
          });

          this.temp(227);
          // setInterval(() => {
          //   console.log("SetTimeOut");
          //   this.temp(100 + Math.random());
          // },2000)
  }

  temp(a,b){
    let size = this.props.data.length < 10 ? 227 : 350;
    const svgBox = this.svg.getBoundingClientRect();
    const hexBox = this.hexGroup.node().getBBox();
    const scaleX = svgBox.width / size;
    const scaleY = svgBox.height / size;
    const centerX = (svgBox.width / 2) - ((hexBox.width * scaleX) / 2);
    this.hexGroup.attr('transform', `matrix(0, 0, 0, 0, ${centerX}, 0)`)
      .transition()
      .duration(transitionDuration)
        .attr('transform', `matrix(${scaleX}, 0, 0, ${scaleY}, ${centerX}, 0)`)
  }

  componentDidUpdate() {
    this.hexGroup
      .selectAll('.hex')
      .data(this.state.hexData)
      .select('path')
        .transition()
        .duration(transitionDuration)
        .attr('fill', hexFill);
  }

  render() {
    return <svg className={this.props.classnameCustom} ref={ svg => this.svg = svg }/>;
  }
}