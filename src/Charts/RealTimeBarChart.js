import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';

function RealTimeBarChart({ width, height}){
    const ref = useRef();
   

  const data = [
    [10, 30, 40, 20,10,20]

  ];
  let a = [1,5,6,8,7];
  var i = 0;

  const [dataq, setDataq] = useState([]);
  const [array1, setArray1] = useState([]);

    useEffect(() => {
        changeData();
    }, []);

    const changeData = () => {
        // setDataq(data[i++]);
        // if(i === data.length) i = 0;
        setInterval(() => {
            a.push(88);
            setArray1(a => [...a,5] );
            data[0].push(55)
            setDataq(a);
            console.log(dataq);

            if(i === data.length) i = 0;
        },1000)
    }


    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [dataq]);

    const draw = () => {
        
        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").data(dataq);
        var yScale = d3.scaleLinear()
                            .domain([0, d3.max(dataq)])
                            .range([0, height-100]);
        
        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 45)
            .attr("y", (d) => height)
            .attr("width", 40)
            .attr("height", 0)
            .attr("fill", "orange")
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))
        
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default RealTimeBarChart