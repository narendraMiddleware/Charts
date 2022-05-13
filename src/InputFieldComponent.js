import React,{useState} from 'react';
import './styles.css';

function InputFieldComponent(props) {
    const[value, setValue] = useState("");

    const onChangeValue = (e) => {
      console.log("Here",e.target.value);
    }

  return (
    <div>
        <div class="fieldInput">
            <input class="form-input" value={value} onChange={(e) => {setValue(e.target.value)}} type="email" placeholder="Past the data URL" />
            <button type="submit" onClick={() => props.passURLFunc(value)} class="form-submit">Enter</button>
        </div>
        <div onChange={onChangeValue} style={{alignItems:'center',textAlign:'center',color:'white',fontFamily:'sans-serif'}}>
        <input type="radio" value="LC" name="gender" /> Line Chart
        <input type="radio" value="BC" name="gender" /> Bar Chart
        <input type="radio" value="DC" name="gender" /> Donut Chart
        </div>
    </div>
  )
}

export default InputFieldComponent