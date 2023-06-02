import "./styles.css";
import {useState,useRef,useEffect} from "react"

import DATA from "./dummyData.json"


/*
Note : 
why not use useRef for elements that share same characteristics ?  👇

where there are buttons, sharing same charateristsics, its better to not use
useRef for them ,because each ref you assign to a dom nod is going to be unique,
useRef will consider the multiple elements as same element if there ref is same! 


what should you use instead? 👇  
well , you are good to go with by using useState for this, there is a high chance when you get multiple same elemens,
each elements ig going to a unique id, by using id you can determine which element was hovered

*/ 


export default function App() {
const [isButtonHovered,setIsButtonHovered] = useState(false)
const [isSecondButtonHovered,setIsSecondButtonHovered] = useState(false)
const [deleteUserButtonHovered,setDeleteUserButtonHovered] = useState({})


const buttonRef = useRef(null)
const secondButtonRef = useRef(null)
const deleteUserButtonRef = useRef(null)


const handleMouseEnterFirstButton = () => {
  setIsButtonHovered(true)
}

const handleMouseLeaveFirstButton = () => {
  setIsButtonHovered(false)
}

const handleMouseEnterSecondButton = () => {
  setIsSecondButtonHovered(true)
}

const handleMouseLeaveSecondButton = () => {
  setIsSecondButtonHovered(false)
}

/*
uncoment these deleteButtons and scroll down look for delete button in jsx also uncomment it, you will
see it wont work with useRef!

*/

// these wont work the way you think they should 🤔
// const handleMouseEnterUserDeleteButton= () => {
//   setDeleteUserButtonHovered(true)
// }

// const handleMouseLeaveDeletUserButton = () => {
//   setDeleteUserButtonHovered(false)
// }


// solution
const handleMouseEnterUserDeleteButton = (userId) => {
  setDeleteUserButtonHovered((prevState) => ({
    ...prevState,
    [userId]: true,
  }));
};

const handleMouseLeaveDeleteUserButton = (userId) => {
  setDeleteUserButtonHovered((prevState) => ({
    ...prevState,
    [userId]: false,
  }));
};

useEffect(() => {
  
  const button = buttonRef.current
  const secondButton = secondButtonRef.current
  // const deleteButton = deleteUserButtonRef.current

    button.addEventListener('mouseenter', handleMouseEnterFirstButton)
    button.addEventListener('mouseleave', handleMouseLeaveFirstButton)
 

    secondButton.addEventListener('mouseenter', handleMouseEnterSecondButton)
    secondButton.addEventListener('mouseleave', handleMouseLeaveSecondButton)

    // deleteButton.addEventListener('mouseenter', handleMouseEnterUserDeleteButton)
    // deleteButton.addEventListener('mouseleave', handleMouseLeaveDeleteUserButton)


  return () => {
  
      secondButton.removeEventListener('mouseenter', handleMouseEnterSecondButton)
      secondButton.removeEventListener('mouseleave', handleMouseLeaveSecondButton)
    

 
      button.removeEventListener('mouseenter', handleMouseEnterFirstButton)
      button.removeEventListener('mouseleave', handleMouseLeaveFirstButton)

      // deleteButton.removeEventListener('mouseenter', handleMouseEnterUserDeleteButton)
      // deleteButton.removeEventListener('mouseleave', handleMouseLeaveDeleteUserButton)
    
  }

},[])

  return (
    <div className="App">
      <div>
        <h3> 2 different buttons </h3>
     <button className={`first-button ${isButtonHovered ? "bg-primary" : "bg-secondary"}`}  ref={buttonRef}>first button</button>     
     <button className={`second-button ${isSecondButtonHovered ? "bg-success" : "bg-danger"}`}  ref={secondButtonRef}>second button</button>
    </div>


    <div>
      <h3>Buttons Sharing Same Characteristics</h3>
     {
       DATA.map(user => {
         return <div>
           {  user.name}
          { /* wont work */}
           {/* <button data-id={user.id} className={`delete-button ${deleteUserButtonHovered ? "bg-primary" : "bg-success"}`} ref={deleteUserButtonRef}>delete User</button> */}
          <button
          className={`delete-button ${deleteUserButtonHovered[user.id] ? "bg-primary" : "bg-success"}`}
          onMouseEnter={() => handleMouseEnterUserDeleteButton(user.id)}
          onMouseLeave={() => handleMouseLeaveDeleteUserButton(user.id)}
        ref={deleteUserButtonRef}>delete User</button>          
         </div>
       })
     }
    </div>
    
    </div>
  );
}
