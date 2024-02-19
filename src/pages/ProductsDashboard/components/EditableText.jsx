import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";

function EditableText({ text, style, name,id, onFocus,defaultText = "", className, onTextChange = () => { } }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');



    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        onTextChange(text,name)
    }, [text]);

    const handleBlur = () => {
        setIsEditing(false);
        if (inputValue.trim() === '') {
            setInputValue(text);
            alert('Lütfen bir değer girin.');
        } else {
            onTextChange(inputValue,name);
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
        setInputValue(text);
    };

    return (
        <div style={style} className={className}>
            {isEditing ? (
                <TextField
                    variant="standard"
                    size="small"
                    type="text"
                    id={id}
                    onFocus={onFocus}
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={handleDoubleClick}>{defaultText?defaultText:text}</span>
            )}
        </div>
    );
}

export default EditableText;
