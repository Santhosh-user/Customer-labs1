import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./popup.css";
import axios from "axios"


const Popup = ({closePopup}) =>{

    //all the states used
   
    const [dropList, setdropList] = useState([])
    const [temp,setTemp] = useState()
    const [text,setText] = useState("")
    const [name,setName] = useState("")


    //when button is clicked, new dropdown with selected value appears

    const sHandler =() =>{

        var checkCondition = dropList.filter(x=>{ 
            
            return x[0].label==temp[0].label
            
        })
      
    // The below is to prevent a new dropdown with same option to appear when the button is clicked twice

        if(checkCondition.length==0){

            setdropList([...dropList,temp])

            var filteredOptions = list.filter(x=> x.label !==temp[0].label)
            setList(filteredOptions)
            
            var element = document.getElementById("listValues")
            element.value = "select"
            
            setName(text)
        }
    }

   //when option is selected

    const onChangeHandler = (e) => {

        var index = list.filter(x => x.label ===e.target.value)
        setTemp(index)
        console.log(temp, "temp")

    }

    //to render the list with unselected values

    useEffect(()=>{
       
    },[dropList])

    //given list of options

    const [list, setList] = useState([{value: "first_name", 
    label: "First Name"}, {value: "last_name", 
    label: "Last Name "},{value: "gender", 
    label: "Gender"},{value: "age", 
    label: "Age"},{value: "account_name", 
    label: "Account Name"},{value: "city", 
    label: "City"},{value: "state", 
    label: "State"} ])


    //when the save the segment button is clicked, the data is extracted in the needed format and sent to the server

    const handleSubmit = (e) =>{
        e.preventDefault()

        var tempArray = []
        
        dropList.map((item,i)=>{
            var tempObj = {}
            tempObj[item[0].value] = item[0].label
            tempArray.push(tempObj)
            
        })
        
        axios.post('https://webhook.site/c6d0bf03-39aa-4e02-99c9-f391b9afd67a', {
            segment_name: name,
            schema: tempArray,
        })
        .then(function (response) {
            console.log(response);
        
        })
        .catch(function (error) {
            console.log(error);
        });
    
    }

    return ( 
    
        <div className="popup-box">

            <div className="box" >

                <div className="header-color">
                    <div className="header-text-1" >Saving Segment</div>
                </div>

                <div className="heading-2" >Enter name of the segment</div> 
            
                <input placeholder="Name of the Segment" className="txt-input" onChange={(e)=>{setText(e.target.value)}} type="text" />

                <div className="paragraph" >To save your segment, you need to add the schemas to build the query</div>

                <div className="traits">

                    <div className="user-trait">
                        <button className="green-dot" ></button>
                        <div> - User Traits </div>
                    </div>

                    <div className="group-trait">
                        <button className="red-dot" ></button>
                        <div> - Group Traits </div>
                    </div>
                    
                </div>

                    {dropList.map((e,i)=> {
                        
                        return ( 

                            <div className="dropdown">

                                <select defaultValue={true}>
                            
                                    <option className="dropdown" value={e[0].value}>{e[0].label}</option>

                                    <div>
                                        {list.map((listi) => {
                                            return( 
                                                <option className="dropdown" value = {listi.label} id={listi.value}> {listi.label} </option>
                                            )
                                        })}
                                    </div>
                            
                                </select>

                            </div>
                        )

                    })}  

                <div className="dropdown">
                
                    <select id="listValues" defaultValue={"select"}  onChange={onChangeHandler}>
                        
                        <option value="select">Add schema to segment</option>
                        
                        {list.map((listi) => {
            
                            return( 
                                
                                <option value = {listi.label} id={listi.value}> {listi.label} </option>
                            )        

                        })}
                    
                    </select>

                </div>
                
                <div>
                    <button className="new-schema-btn" onClick={sHandler} >+ Add new schema</button>
                </div>

                <div className="bottom">

                    <button className="save-segment-btn" onClick={handleSubmit}>Save the segment</button>
                    <button onClick={()=>closePopup()} className="btn-close">Cancel</button>

                </div>
                
            </div>
      
        </div> 
    )

}

export default Popup;

