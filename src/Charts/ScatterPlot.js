import React, { useRef, useEffect, useState,useCallback } from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand, axisLeft } from "d3";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

const ScatterPlot = props => {
  return (
    <BubbleChart customClassNmae={props.classnameCustom} setRefreshFunctionSC={props.setRefreshFunctionSC} data={props.data} />
  )
}

export default ScatterPlot;

const SomeChart = ({width, height, className,data}) => {
  // const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const BubbleChartRef = useRef(null)
  const InitialData = [{'r':2,'x':2,'y':1},
    {'r':4,'x':3,'y':2},
    {'r':5,'x':50,'y':30},
    {'r':7,'x':5,'y':3},
    {'r':3,'x':8,'y':9}];


  useEffect(() => {

    const svg = select(BubbleChartRef.current)
    const highestX = Math.max(...data.map(o => o.x));
    const highestY = Math.max(...data.map(o => o.y));
    let yScale = scaleLinear().domain([highestY + 10, 0]).range([0,height])
    let xScale = scaleLinear().domain([5, highestX + 10]).range([0,width])

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    // create y-axis
    const yAxis = axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAxis)


    svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr('r', (d)=>Math.round((d.r - 5) + ((width + height) / (180 - d.r))))
      .attr('cx', (d, i)=>xScale(d.x))
      .attr('cy', (d, i)=>yScale(d.y))
      .attr('fill','#414449')
      .attr('stroke',"#595b60")
      .attr('stroke-width','2')
  }, [width, height])

  return <div ref={wrapperRef} style={{height:"97%" }}>
    <svg ref={BubbleChartRef} className={`bubble-chart-svg  ${className}`} >
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </div>
}

const BubbleChart = ({customClassNmae, setRefreshFunctionSC, data}) => {
  const [height, setHeight] = useState(350);
  const [width, setWidth] = useState(590);

  const updateDimensions = useCallback((a,b) => {
    setHeight(a);
    setWidth(b);
  },[])
  
  useEffect(() => {
    setRefreshFunctionSC(updateDimensions)
  }, [])

  return <SomeChart className={customClassNmae} width={width} height={height} data={data} />
}