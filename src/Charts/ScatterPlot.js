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
    <BubbleChart customClassNmae={props.classnameCustom} />
  )
}

export default ScatterPlot;

const SomeChart = ({width, height, className}) => {

  const BubbleChartRef = useRef(null)
  const InitialData = [{'r':2,'x':2,'y':1},
                      {'r':4,'x':3,'y':2},
                      {'r':5,'x':7,'y':10},
                      {'r':7,'x':5,'y':3},
                      {'r':3,'x':8,'y':9}]

  useEffect(() => {
      
      const svg = select(BubbleChartRef.current)
      let yScale = scaleLinear().domain([0, 20]).range([0,height])
      let xScale = scaleLinear().domain([0, 20]).range([0,width])
      svg.selectAll("circle")
          .data(InitialData)
          .join("circle")
          .attr('r', (d)=>d.r)
          .attr('cx', (d, i)=>xScale(d.x))
          .attr('cy', (d, i)=>yScale(d.y))
          .attr('fill','red')
  }, [width, height])

  return <svg ref={BubbleChartRef} className={`bubble-chart-svg  ${className}`} />
}

const BubbleChart = ({customClassNmae}) => {
  const [height, setHeight] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerHeight);

  const updateDimensions = useCallback(() => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);     
  },[])

  useEffect(() => {
      window.addEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
      updateDimensions();
      return () => window.removeEventListener('resize', updateDimensions);
  }, [])

  return <SomeChart className={customClassNmae} width={width/2} height={height/2} ></SomeChart>
}