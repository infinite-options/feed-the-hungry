import React, { useState } from "react";

import useField from "components/Hooks/useField";
import inputField from "components/Form/InputField";

function QuickDonation() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} style={{width: "720px", maxWidth: "100%", margin: "auto"}}>

        </form>
    );
}

export default QuickDonation;
