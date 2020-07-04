import React, { useState, forwardRef, useImperativeHandle } from "react";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";

const FamilyMembers = forwardRef((props, ref) => {
    const addition = {
        a_firstName : useField("First Name", "text"),
        a_lastName : useField("Last Name", "text"),
        a_dob : useField("Date of Birth", "date"),
    }

    // Testing adding additional people
    const [persons, setPersons] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const savePerson = () => {
        let data = [
            addition.a_firstName.value, 
            addition.a_lastName.value, 
            addition.a_dob.value, 
        ]
        let isAllValid = true;
        for (let input in addition) {
            if (!addition[input].isValid) {
                isAllValid = false;
            }
        }
        if (isAllValid) {
            persons.push(data);
            setPersons([...persons]);
            
            clearPersonForm();
            console.log(persons);
        }
    }

    const delPerson = (idx) => {
        persons.splice(idx, 1);
        console.log(idx);
        console.log(persons);
        setPersons([...persons]);
    }

    const clearPersonForm = () => {
        for (let input in addition) {
            addition[input].resetinput();
        }
        setShowForm(false);
    }

    function listPersons() {
        return (
            <div className="column">
                {persons.map((person, idx) => (
                    <p key={idx}>
                        {person[0] + ' ' + person[1]} <button onClick={() => delPerson(idx)}> X </button>
                    </p>
                ))}
            </div>
        );
    }

    useImperativeHandle(ref, () => ({
        persons,
    }));

    return (
        <div className="column">
            <div className="has-text-centered">
                {showForm ? (
                    <React.Fragment>
                        <button className="button is-success has-margins-0-5" onClick={clearPersonForm}>Cancel</button>
                        <button className="button is-success has-margins-0-5" onClick={savePerson}>Save</button>
                    </React.Fragment>
                ) : (
                    <button className="button is-success has-margins-0-5" onClick={() => setShowForm(true)}>Add a Family Member</button>
                )}
            </div>
            {showForm && (
                <React.Fragment>
                    <InputField props={addition.a_firstName} />
                    <InputField props={addition.a_lastName} />
                    <InputField props={addition.a_dob} />
                </React.Fragment>
            )}
            <div className="box">
                {listPersons()}
            </div>
        </div>
    );
})

export default FamilyMembers;
