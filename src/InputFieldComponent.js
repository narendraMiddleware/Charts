import React, {useState} from 'react';
import './styles.css';

function InputFieldComponent(props) {
    const [value, setValue] = useState("");
    const [graphType, setGraphType] = useState("line_chart");
    return (
        <div>
            <div className="fieldInput">
                <input className="form-input" value={value} onChange={(e) => {
                    setValue(e.target.value)
                }} type="email" placeholder="Past the data URL"/>
                <button type="submit" onClick={() => {
                    if (!value) {
                        alert("Please enter URL!")
                    } else {
                        props.passURLFunc(value, graphType)
                    }
                }} className="form-submit">Enter
                </button>
            </div>
            <div
                onChange={(e) => {
                    setGraphType(e.target.value)
                }}
                style={{alignItems: 'center', textAlign: 'center', color: 'white', fontFamily: 'sans-serif'}}>
                <input defaultChecked={graphType === "line_chart"} type="radio" value="line_chart"
                       name="gender"/> Line Chart
                <input defaultChecked={graphType === "bar_chart"} type="radio" value="bar_chart"
                       name="gender"/> Bar Chart
                <input defaultChecked={graphType === "donut_chart"} type="radio" value="donut_chart"
                       name="gender"/> Donut Chart
                <input defaultChecked={graphType === "heat_map"} type="radio" value="heat_map"
                       name="gender"/> Heat Map
                <input defaultChecked={graphType === "hexagon"} type="radio" value="hexagon"
                       name="gender"/> Hexagon
                <input defaultChecked={graphType === "scatter_plot"} type="radio" value="scatter_plot"
                       name="gender"/> Scatter Plot
            </div>
        </div>
    )
}

export default InputFieldComponent