import React from "react";

// to use this component, make sure that the array being passed in must be
// an array of object
function Select({ props, data }) {
  let i = 0;
  return (
    <div className="field">
      <div className="control is-expanded">
        <div
          className={
            !props.isValid
              ? "select is-danger is-fullwidth"
              : "select is-fullwidth"
          }
        >
          <select value={props.value} onChange={props.onChange}>
            <option key={i++} value="">
              {props.name}
            </option>
            {Object.keys(data).map((x) => (
              <option key={i++} value={x}>
                {data[x]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="help is-danger">{props.error}</p>
    </div>
  );
}

export default Select;
