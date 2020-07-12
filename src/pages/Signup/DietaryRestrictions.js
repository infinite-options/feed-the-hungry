import React, { useState, forwardRef, useImperativeHandle } from "react";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Icons from "components/Icons/Icons";

const DietaryRestrictions = forwardRef((props, ref) => {
    const inputs = {
        vegan : useField("Vegan", "checkbox"),
        vegetarian : useField("Vegetarian", "checkbox"),
        glutenFree : useField("Gluten Free", "checkbox"),
        kosher : useField("Kosher", "checkbox"),
        halal : useField("Halal", "checkbox"),
        none : useField("None", "checkbox"),
    }

    const [hidden, setHidden] = useState("hidden");
    let restrictions = [inputs.vegan.value, inputs.vegetarian.value, 
                        inputs.glutenFree.value, inputs.kosher.value, 
                        inputs.halal.value];
    let hasRestrictions = inputs.vegan.value || inputs.vegetarian.value
                       || inputs.glutenFree.value || inputs.kosher.value 
                       || inputs.halal.value;
    let noneSelected = !!inputs.none.value;

    useImperativeHandle(ref, () => ({
        checkValues() {
            if (!inputs.none.value && !hasRestrictions) setHidden("");
        },
        valid() {
            return inputs.none.value || hasRestrictions;
        },
        restrictions,
    }));

    return (
        <React.Fragment>
            <InputField props={inputs.vegan} icon={Icons.Vegan} isDisabled={noneSelected}/>
            <InputField props={inputs.vegetarian} icon={Icons.Vegetarian} isDisabled={noneSelected} />
            <InputField props={inputs.glutenFree} icon={Icons.GlutenFree} isDisabled={noneSelected} />
            <InputField props={inputs.kosher} icon={Icons.Kosher} isDisabled={noneSelected} />
            <InputField props={inputs.halal} icon={Icons.Halal} isDisabled={noneSelected} />
            <InputField props={inputs.none} isDisabled={hasRestrictions} />
            <div className={hidden === "" && (inputs.none.value || hasRestrictions === true) ? "hidden" : hidden}>
                <article className="message is-danger error-msg">
                    <div className="message-body">Please select any dietary restrictions you have. If none are applicable, please select N/A.</div>
                </article>
            </div>
        </React.Fragment>
    );
})

export default DietaryRestrictions;
