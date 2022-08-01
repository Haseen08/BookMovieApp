import React from "react";
import Header from "./common/header/Header";
import Controller from "./screens/Controller";
  
function App(props) {
  return (
  
   // Using the newly created Header 
   // component in this main component
   <div>
   
   <Header {...props} />
   <Controller />
   </div>
  );
}
export default App;