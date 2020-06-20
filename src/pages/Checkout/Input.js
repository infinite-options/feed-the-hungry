// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Icons from 'components/Icons/Icons';
// import StateAPI from 'API/StateAPI';

// const states = StateAPI();
// const inputs = [
//     { name: "First Name",
//       refs: "fname",
//       type: "text",
//       icon_left: null,
//       icon_right: null,
//       line: 1
//     },
//     {
//         name: "Last Name",
//         refs: "lname",
//         type: "text",
//         icon_left: null,
//         icon_right: null, 
//         line: 1
//     },
//     {
//         name: "Phone Number",
//         refs: "phone",
//         type: "tel",
//         icon_left: null,
//         icon_right: null,
//         line: 2
//     },
//     {
//         name: "Email",
//         refs: "email",
//         type: "text" ,
//         icon_left: null,
//         icon_right: null,
//         line: 3
//     },
//     {
//         name: "Street",
//         refs: "street",
//         type: "text" ,
//         icon_left: null,
//         icon_right: null,
//         line: 4
//     },
//     {
//         name: "City",
//         refs: "city",
//         type: "text",
//         icon_left: null,
//         icon_right: null,
//         line: 5
//     },
//     {
//         name: "Select a state",
//         refs: "state",
//         type: "dropdown" ,
//         dropdown_data: states.data,
//         icon_left: null,
//         icon_right: null,
//         line: 6 
//     },
//     {
//         name: "Zip Code",
//         refs: "zip",
//         type: "text",
//         icon_left: null,
//         icon_right: null,
//         line: 6,
//     },
//     {
//         name: "Notes",
//         refs: "notes",
//         type: "textarea",
//         icon_left: null,
//         icon_right: null,
//         line: 7,
//     },
    
// ]

// function InputLine(obj, line){
//     if(obj.line === line){
//         return (
//             <div className="field is-horizontal">
//                 <div className="field-body">

//                 </div>
//             </div>
//         )
//     }
// }
// function Input(obj) {
//     const [value, setValue] = useState("");
//     const [error, setError] = useState("");

//     const onChange = (e) => {
//         if (e.target.value.length === 0) setError("This field is required");
//         else setError("");

//         setValue(e.target.value);
//     }


//     if (obj.refs === "phone"){
//         return (
//             <div class="field is-expanded">
//                 <div class="field has-addons">
//                     <p class="control">
//                         <a class="button is-static">
//                             +1
//                         </a>
//                     </p>
//                     <p class="control is-expanded">
//                         <input class="input" type={obj.type} placeholder={obj.name} onChange={onChange} />
//                     </p>
//                 </div>
//                 <p class="help is-danger">{error}</p>
//                 <p class="help">Do not enter the first zero</p>
//             </div>
//         );
//     }
//     else {
//         if (obj.type === "radio"){
//             return (
//                 <div class="field">
//                     <div class="control">
//                         <label class="radio">
//                         <input type="radio" name={obj.name} />
//                         {obj.name}
//                         </label>
//                     </div>
//                 </div>
//             );
//         }
//         else if (obj.type === "dropdown") {
//             return (
//                 <div class="field">
//                     <div class="control">
//                         <div class="select">
//                         <select>
//                             <option value="">{obj.name}</option>
//                             {Object.keys(data).map(x => 
//                                 <option value={x}>{data[x]}</option>
//                             )}
//                         </select>
//                         </div>          
//                     </div>
//                     <p class="help is-danger">{error}</p>
//                 </div>
//             );
//         }
//         else {
//             return (
//                 <div class="field">
//                     <p class="control is-expanded has-icons-left has-icons-right">
//                         <input refs={obj.refs} class="input" type={obj.type} placeholder={obj.name} />
//                         {obj.icon_left ? 
//                             <span class="icon is-small is-left">
//                                 <FontAwesomeIcon icon={obj.icon_left} />
//                             </span> : ""
//                         }
//                             {obj.icon_right ? 
//                             <span class="icon is-small is-right">
//                                 <FontAwesomeIcon icon={obj.icon_right} />
//                             </span> : ""
//                         }
//                     </p>
//                     <p class="help is-danger">{error}</p>
//                 </div>
//             );
//         }
//     }
    
// }
// export default Input;