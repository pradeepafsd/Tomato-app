import { useState } from "react";

const Validation =(initialValues)=>{
    
      
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (field, value)=>{
          setValues({...values, [field]: value})
    }
    
    const validate = (type)=>{

        let newErrors = {};

        if(type=="signup"){
            if(!values.name)
                 newErrors.name= "Name is required";
        }

        if(!values.email)
                 newErrors.email= "Email is required";
        else if(!values.email.includes("@")) 
              newErrors.email= "Provide valid Email";

        if(!values.password)
                 newErrors.password= "Password is required";
        else if(values.password.length<6) 
              newErrors.password= "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
   return {values, errors, handleChange, validate};
};

export default Validation;