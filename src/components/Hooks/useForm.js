import React, { useState } from 'react';
const useForm = () => {
    const [submittedForm, setSubmittedForm] = useState(false)
    return {
        submittedForm,
        setSubmittedForm
    };
};
export default useForm;