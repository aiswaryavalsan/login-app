import React from 'react';
import classes from './UserInput.module.css';
const UserInput=(props)=>{
    return(
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
         >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            type={props.type}
            id={props.id}
            value={props.val}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    )
}
export default UserInput;