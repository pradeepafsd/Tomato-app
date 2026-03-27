import { useState } from "react";

// Custom hook for form validation
const Validation =(initialValues)=>{
    
    const [values, setValues] = useState(initialValues); // Stores form input values
    const [errors, setErrors] = useState({}); // Stores validation errors

    // Handle input changes and update values state
    const handleChange = (field, value)=>{
          setValues({...values, [field]: value})
    }
    
    // Validate form fields based on type (e.g., signup)
    const validate = (type)=>{

        let newErrors = {};

        if(type=="signup"){
            if(!values.name)
                 newErrors.name= "Name is required"; // Name validation
        }

        if(!values.email)
                 newErrors.email= "Email is required"; // Email required
        else if(!values.email.includes("@")) 
              newErrors.email= "Provide valid Email"; // Email format check

        if(!values.password)
                 newErrors.password= "Password is required"; // Password required
        else if(values.password.length<6) 
              newErrors.password= "Password must be at least 6 characters"; // Password length check

        setErrors(newErrors); // Update errors state
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
   
   return {values, errors, handleChange, validate}; // Expose values, errors, and handlers
};

export default Validation;