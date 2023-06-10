  // Making a TO DO list using react js
  import "./style.css"
  import { useState,useEffect } from "react";

  // Main APP 
  export default function App(){

    const [mainarray , setmainarray] = useState(()=>
    {
        const mainArr= JSON.parse(localStorage.getItem("values"));
        if(mainArr=== null) return [];
        return mainArr;
    });

    useEffect(()=>{
      localStorage.setItem("values",JSON.stringify(mainarray));
    },[mainarray])


    function update(x){
      let newvalue = {"id":crypto.randomUUID(), "value":x , "checked" : 0};
      const newArray = [...mainarray,newvalue]
      setmainarray(newArray);
      console.log(newArray);
    }

    // function checkboxChanged(thisId){
    //   let newArray = [...mainarray];
    //   newArray.forEach((ele)=>{
    //     if(ele.id==thisId) ele.checked = !(ele.checked);
    //   })
    //   setmainarray(newArray);
    // }

    function deletefunction(deleteId){
      console.log('Deleted button');
      let newArray = [...mainarray]; // spreading of array is important so that 
      newArray.forEach((ele,index)=>{
        if(deleteId== ele.id){
          newArray.splice(index,1);
          setmainarray(newArray);
          console.log(mainarray);
        }
      })
    }


  

    return(
      <div className="main-div">
        <h1 className="headline">Add new item here</h1>
        <But updatingFunction={update}/>
        <h1 className="todo-list">Todo List</h1>
        
        {mainarray.map((ele)=>(<Todo key={ele.id} myId={ele.id} value={ele.value} deleteFunc={deletefunction}/>))} 
        
      </div>
    )
  }


  // Input Button component 
  function But({updatingFunction}){
    function eventlistener(event){
      event.preventDefault();
      let myButton= document.querySelector('.input-btn');
      let myvalue = myButton.value;
      updatingFunction(myvalue)
      myButton.value = '';
    }
    return(
      <div>
        <form className="form">
          <input type="text" className="input-btn" /> <br/>
          <button type="submit" className="submit-btn" onClick={eventlistener}>Add to List</button>
        </form>
      </div>
    )
  }



  // TODO component 
  function Todo({myId,value,deleteFunc,}){
    const [ classname, setclassname] = useState("unchecked");
    
    function myFunction(event){
      if(classname=="unchecked"){
        setclassname('checked') 
        console.log('status - checked')
      }
      else if(classname== "checked"){
        setclassname('unchecked');
        console.log('status - unchecked')
      }
      console.log(event);
    
    }
        
    return(
      <div className="todo-list-div">
          <input type="checkbox" className="todo-checkbox" id={myId} onChange={()=>myFunction()} />
          <label htmlFor={myId} className={classname}>{value}</label>
          <button className="delete-btn" onClick={()=>deleteFunc(myId)}>Delete</button>
      </div>
    )
  }