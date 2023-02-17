import React, { useState,useReducer,useEffect} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
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
    props.onLogin(emailState.val,passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
           passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
