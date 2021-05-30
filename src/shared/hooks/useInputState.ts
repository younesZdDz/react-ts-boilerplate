import React, { useState } from 'react';

const useInputState: (
    initialValue: string | undefined,
) => [string, (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void, () => void] = (
    initialValue = '',
) => {
    const [value, setValue] = useState(initialValue);
    const reset = () => {
        setValue(initialValue);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return [value, handleChange, reset];
};

export default useInputState;
