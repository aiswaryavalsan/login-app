import React,{useEffect,useState} from 'react'
const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogin:()=>{},
    onLogout:()=>{}
    
});
export const AuthContextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        const loginfo=localStorage.getItem('isLogedIn');
        if(loginfo==='1'){
          setIsLoggedIn(true);
        }
      },[])
      const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        setIsLoggedIn(true);
        localStorage.setItem('isLogedIn','1');
      };
    
      const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLogedIn','0');
      };
      return(<AuthContext.Provider value={{ isLoggedIn: isLoggedIn,onLogin:loginHandler,onLogout:logoutHandler}}>{props.children}</AuthContext.Provider>);
}
export default AuthContext;