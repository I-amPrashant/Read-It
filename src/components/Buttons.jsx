import React , {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from './GlobalState'

export default function Buttons(props) {
    const [isHovered, setIsHovered]=useState(false)
    const {setSubTopics}=useContext(GlobalContext)

        const theme={
          backgroundColor: 'rgb(238 238 238)',
          color: 'black',
          padding: '6px 9px',
          borderRadius: '10px',
          fontSize:'16px',
          fontWeight:'500',
          transition:'all 0.3s ease',
        }
        const hoverTheme={
            ...theme,//spread operator is used to use the main theme as well.
          backgroundColor: 'rgb(230 230 230)',
          color: 'red',
        }
let path="";
        if(props.category==='general'){
          path=`/Read-It/`
        }else{
          path=`/Read-It/${props.category}`
        }

        const currentStyle=isHovered || props.categoryName===props.category ?hoverTheme:theme;

        if(props.category==="world"){
          return ;
        }else{
          return (
            <button style={currentStyle} onMouseOver={()=>setIsHovered(true)}
            onMouseOut={()=>setIsHovered(false)}
            onClick={()=>{
              props.setCategoryName(props.category);
              setSubTopics("");
            }}
            ><Link to ={path}>{props.category}</Link></button>
          )
        }
}
