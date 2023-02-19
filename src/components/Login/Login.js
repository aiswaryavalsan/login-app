import React, { useState,useReducer,useEffect,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import UserInput from '../UI/UserInput/UserInput';
const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return{val:action.val,isValid:action.val.includes('@')}
  }
  if(action.type==='USER_BLUR'){
  return{val:state.val,isValid:state.val.includes('@')};
  }
}
const passwordReducer=(state,action)=>{
  if(action.type==='USER_PASWORD'){
    return{value:action.value,isValid:action.value.trim().length>6}
  }
  if(action.type==='USER_BLUR'){
    return{value:state.value,isValid:state.value.trim().length>6}
  }

}
const Login = (props) => {
  
  const lctx=useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const[emailState,emailDispatcher]=useReducer(emailReducer,{
    val:'',
    isValid:null
  })
  const[passwordState,passwordDispatcher]=useReducer(passwordReducer,{value:'',isValid:null});
 useEffect(()=>{
    
   const id=setTimeout(()=>{
    console.log('side effect');
     setFormIsValid(emailState.isValid && passwordState.isValid);
    },500)
     return()=>{
    console.log('cleanup');
    clearTimeout(id);
   }
  },[emailState,passwordState]);
  const emailChangeHandler = (event) => {
    emailDispatcher({type:'USER_INPUT',
                     val:event.target.value});
                    
                     //setFormIsValid(emailState.val.includes('@') &&passwordState.value.trim().length > 6)
    
  };

  const passwordChangeHandler = (event) => {
    
    passwordDispatcher({type:'USER_PASWORD',value:event.target.value})
    //setFormIsValid(emailState.val.includes('@') &&passwordState.value.trim().length > 6)
   
  };

  const validateEmailHandler = () => {
    emailDispatcher({type:'USER_BLUR'});

  };

  const validatePasswordHandler = () => {
    passwordDispatcher({type:'USER_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    lctx.onLogin(emailState.val,passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <UserInput   type="email"
      id="email"
      label="email"
      isValid={emailState.isValid}
      value={emailState.val}
      onChange={emailChangeHandler}
      onBlur={validateEmailHandler} />
      <UserInput   type="password"
      id="password"
      label="password"
      isValid={passwordState.isValid}
      value={passwordState.val}
      onChange={passwordChangeHandler}
      onBlur={validatePasswordHandler} />
        
       
          
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
