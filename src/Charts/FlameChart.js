import React, { useRef, useEffect, useState,useCallback } from "react";
import { FlameGraph } from 'react-flame-graph';

function FlameChart(props) {

  const [height, setHeight] = useState(1000);
  const [width, setWidth] = useState(1000);

  const updateDimensions = useCallback(() => {
      console.log("Jello");
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);     
  },[])

  
  useEffect(() => {
      window.addEventListener('resize', updateDimensions);
  }, []);

  const refreshMe = () => {
    console.log("Helllo from different universe");
  }


  return (
    <FlameGraph
        data={props.data}
        height={props.height}
        width={props.width}
        palette={'red'}
        onChange={node => {
            console.log(`"${node.name}" focused`);
        }}
    />

  )
}

export default FlameChart