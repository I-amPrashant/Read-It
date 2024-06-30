import React from 'react'

export default function CheckboxButton(props) {
  const handleClick=()=>{
    props.setCountryName(prevElement=>prevElement.name===props.subCategory.name?{name:"",code:"", language:'en'}:{name:props.subCategory.name,code:props.subCategory.code, language:props.subCategory.languages[0].code})
  }
  if(props.type==="catName") {
    return (
      <button className='w-max' onClick={()=>
        {
          props.setSubTopics(prevElement=>prevElement===props.subCategory?"":props.subCategory)
        }
      }>
        {props.subTopics===props.subCategory?<i className="fa-solid fa-square-check text-[#f91616de]"></i>:<i className="fa-regular fa-square text-[#f91616de]"></i>}
        <span className='ml-4'>{props.subCategory}</span>
        </button>
    )
  }
  else{
    return (
      <button className='w-max' onClick={handleClick}>
        {props.countryName.name===props.subCategory.name?<i className="fa-solid fa-square-check text-[#f91616de]"></i>:<i className="fa-regular fa-square text-[#f91616de]"></i>}
        <span className='ml-4'>{props.subCategory.name}</span>
        </button>
    )
  }
}
