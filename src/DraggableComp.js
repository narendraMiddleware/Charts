import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import LineChart from './LineChart';


function DraggableComp() {

    const [data, setData] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await fetch("/data.json");
        setData(await response.json());
    };

    return(
        <Draggable
        axis="x"
        handle=".handle"
        >
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    )
}

export default DraggableComp;