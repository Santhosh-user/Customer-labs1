import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./popup.css";
import axios from "axios"


const Popup = ({closePopup}) =>{

  
   
    const [dropList, setdropList] = useState([ ])
    const [temp,setTemp] = useState()
    const [text,setText] = useState("")
    const [name,setName] = useState("")

    const sHandler =() =>{
        var checkCondition = dropList.filter(x=>{ 
         
            return x[0].label==temp[0].label})
      

        if(checkCondition.length==0){
            setdropList([...dropList,temp])
            var filteredOptions = list.filter(x=> x.label !==temp[0].label)
            setList(filteredOptions)
            var element = document.getElementById("listValues")
            element.value = "select"
            setName(text)
        }
    }

   

    const onChangeHandler = (e) => {

        var index = list.filter(x => x.label ===e.target.value)
        setTemp(index)

    }

    useEffect(()=>{
       
    },[dropList])


    

   
    const [list, setList] = useState([{value: "first_name", 
    label: "First Name"}, {value: "last_name", 
    label: "Last Name "},{value: "gender", 
    label: "Gender"},{value: "age", 
    label: "Age"},{value: "account_name", 
    label: "Account Name"},{value: "city", 
    label: "City"},{value: "state", 
    label: "State"} ])

    const handleSubmit = (e) =>{
        e.preventDefault()

        var tempArray = []
        
        dropList.map((item,i)=>{
            var tempObj = {}
            tempObj[item[0].value] = item[0].label
            tempArray.push(tempObj)
            
        })
        console.log(tempArray,"tempArray")
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


    return ( <div className="popup-box" >
        <div className="box" >
            <div className="header-color">
            <div className="header-text" >Saving Segment</div>
            </div>
            <div className="jst-txt" >Enter name of the segment</div> 
         
            <input placeholder="Name of the Segment" className="txt-input" onChange={(e)=>{setText(e.target.value)}} type="text" />
            <div className="jst-txt1" >To save your segment, you need to add the schemas to build the query</div>

        <div>

            {dropList.map((e,i)=> {
                
                return( 
                    <div className="dropdown-section">

                    <select defaultValue={true}>
                
                        <option value={e[0].value}>{e[0].label}</option>

                        <div>

                            {list.map((listi) => {
                            
                                return( 
                                    
                                    <option value = {listi.label} id={listi.value}>
                                    {listi.label}
                                </option>
                                )
                                
                            
                            }
                            
                            )}

                        </div>
                
                    </select>

                    </div>
                )

            })}  

        </div>

        <div>

        <div className="dropdown-section2">

        
        <select id="listValues" defaultValue={"select"}  onChange={onChangeHandler}>
             
            <option value="select">Add schema to segment</option>
            
            {list.map((listi) => {
  
                return( 
                    
                    <option value = {listi.label} id={listi.value}>
                    {listi.label}
                </option>
                )        
           })}
          
        </select>
        </div>
       
        </div>
            
            <div><button className="btn1" onClick={sHandler} >+ Add new schema</button></div>

            <div className="bottom">

            <button className="btn2" onClick={handleSubmit}>Save the segment</button>
            <button onClick={()=>closePopup()} className="btn-close">Cancel</button>

            </div>
             
      </div>
      
    </div> )

    
}

export default Popup

