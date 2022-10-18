import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  function onChange(e) {
    setValue(e.target.value);
  }
/*   function clearInput(){
    setValue('')
  } */
  return {value, onChange}
};

export default useInput;