import {
    curveMonotoneX,
    line as d3Line,
    select,
  } from 'd3';
  
  /**
   * draw elements of the chart based on current settings
   */
  const drawAxes = () => {
    select('.line-chart-xaxis')
      .call(xAxis);
  
    select('.line-chart-yaxis')
      .call(yAxis);
  }
  
  const drawLine = (data) => {
    const line = d3Line()
      .x(scaleXData)
      .y(scaleYData)
      .curve(curveMonotoneX);
  
    select('.line-chart-line')
      .attr('d', line(data));
  }
  
  /**
   * invoke functions to draw appropriate changes
   */
  const renderChanges = (data) => {
    drawAxes();
    drawLine(data);
  }
  
  /**
   * Call all functions necessary to set up the chart
   */
  d3Utils.initializeChart = (data) => {
    buildAxes();
    buildLine();
    renderChanges(data);
  }

  d3Utils.setWidth = (data) => {
    const svg = document.getElementsByClassName('line-chart');
    const svgWidth = svg[0].getBoundingClientRect().width
    xScale.range([0, svgWidth]);
    renderChanges(data);
  }