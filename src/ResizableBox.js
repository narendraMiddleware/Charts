import React from "react";
import { ResizableBox } from "react-resizable";
import Draggable from 'react-draggable';
import "react-resizable/css/styles.css";

const CustomResizeHandle = React.forwardRef((props, ref) => {
  const {handleAxis, ...restProps} = props;
  return (
    <div
      className={`custom-handle custom-handle-${handleAxis} custom-resize-handle-component`}
      ref={ref}
      {...restProps}
    ></div>
  );
});


export default function ResizableBoxs({
  children,
  width = 600,
  height = 300,
  resizable = true,
  style = {},
  className = "",
}) {
  

  return (
        <div>
            <Draggable handle=".handle" >
              <div className="me">
                  <header className="handle">
                    <div className="headerTitle">
                      <div className="handleTitltText"><h2 className="titleText">Panel Title</h2></div>
                    </div>
                  </header>
                  <ResizableBox
                  className="custom-box box"
                  width={650}
                  height={300}
                  handle={<CustomResizeHandle />}
                  onResize={(event, { element, size, axis}) => {window.dispatchEvent(new Event('resize'));}}
                  handleSize={[8, 8]}>
                      <span className="text">{children}</span>
                  </ResizableBox>
              </div>
            </Draggable>
        </div>    
    );
}
