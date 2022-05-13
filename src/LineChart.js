import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { select, axisBottom, axisRight, scaleLinear, scaleBand, axisLeft, scale } from "d3";
import debounce from "lodash/debounce";

const PADDING = 30;

function useResize(ref) {
  
  const [state, setState] = useState();
  useEffect(() => {
    const getSize = debounce(() => {
      if (!ref || !ref.current) {
        return;
      }
      const width = ref.current.offsetWidth ? ref.current.offsetWidth : 350;
      const height = ref.current.offsetHeight ? ref.current.offsetHeight : 450;
      setState({
        width,
        height
      });
    }, 1);

    window.addEventListener("resize", getSize);
    getSize();
    return () => window.removeEventListener("resize", getSize);
  }, [ref]);

  return state;
}

const LineChart = props => {
  const [lineData, setLineData] = useState();
  const [markers, setMakers] = useState();

  const rootRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const size = useResize(rootRef);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!size || !props.data) {
      return;
    }  
    setData(props.data);
    const { width, height } = size;

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([PADDING, width - PADDING]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([height - PADDING, PADDING]);

    const lineGenerator = d3
      .line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(width / 100);
    const yAxis = d3
      .axisLeft()
      .scale(yScale)
      .ticks(height / 50);

    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);

    setLineData(lineGenerator(data));
    setMakers(
      data.map((d, i) => ({
        x: xScale(i),
        y: yScale(d.y)
      }))
    );
  }, [size, props]);

  const [svgWidthHeight, setSvgWidthHeight] = useState({width:627,height:350});

  // setTimeout(() => {
      
  //   setData([{"y":"5.3"},{"y":"7.2"}]);
  //   console.log("Hello",data);
  // },10000);

  return (
    <div className="chart-area" ref={rootRef}>
      {size && (
          <svg className={props.classnameCustom} style={{backgroundColor:"#191b1f"}} width={svgWidthHeight.width} height={svgWidthHeight.height}>
          <g id="axes">
              <g
              id="x-axis"
              ref={xAxisRef}
              transform={`translate(0, ${size.height - PADDING})`}
              />
              <g
              id="y-axis"
              ref={yAxisRef}
              style={{backgroundColor:"white"}}
              transform={`translate(${PADDING}, 0)`}
              />
          </g>
          <g id="chart">
              {lineData && (
              <path stroke="#48bb78" className="chart-line" d={lineData} />
              )}
              {markers &&
              markers.map((marker, i) => (
                  <circle
                  key={i}
                  cx={marker.x}
                  cy={marker.y}
                  r={4}
                  className="chart-marker"
                  />
              ))}
          </g>
        </svg>
      )}
    </div>
  );
};

export default LineChart;
