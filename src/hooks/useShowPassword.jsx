import { useState } from "react";

const useShowPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


  return [showPassword, handleClickShowPassword];
};

export default useShowPassword;