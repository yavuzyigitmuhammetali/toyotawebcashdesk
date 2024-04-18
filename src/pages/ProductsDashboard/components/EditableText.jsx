import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {useTranslation} from 'react-i18next';

function EditableText({
                          text, style, name, id, onFocus, defaultText = "", className = "", onTextChange = () => {
    }
                      }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const {t} = useTranslation();


    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        onTextChange(text, name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    const handleBlur = () => {
        setIsEditing(false);
        if (inputValue.trim() === '') {
            setInputValue(text);
            alert(t('pleaseEnterValue'));
        } else {
            onTextChange(inputValue, name);
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
                <span onDoubleClick={handleDoubleClick}>{defaultText ? defaultText : text}</span>
            )}
        </div>
    );
}

export default EditableText;
