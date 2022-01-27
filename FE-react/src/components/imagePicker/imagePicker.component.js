import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@mui/material';

import './imagePicker.css';

const ImagePicker = props => {

    const { id, onInputLoad } = props;

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const imageInputRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file])

    const changeFile = evt => {
        let pickedFile;
        if (evt.target.files && evt.target.files.length === 1) {
            pickedFile = evt.target.files[0];
            setFile(pickedFile);
        } else {}
        onInputLoad(pickedFile);
    }

    const pickImage = () => {
        imageInputRef.current.click();
    }

    return <div>
        <input
            id={id}
            ref={imageInputRef}
            style={{ display: 'none' }}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={changeFile}
        />
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className="image-upload__preview">
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                {!previewUrl && <p>Please pick an image.</p>}
            </div>
            <Button variant="outlined" onClick={pickImage}>
                Pick Image
            </Button>
        </div>

    </div>
}

export default ImagePicker;