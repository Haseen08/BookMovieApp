import React from "react";
import Header from "./common/header/Header";
import Controller from "./screens/Controller";
  
function App() {
  return (
  
   // Using the newly created Header 
   // component in this main component
   <div>
   
   <Header />
   <Controller />
   </div>
  );
}
export default App;