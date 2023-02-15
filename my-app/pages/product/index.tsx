import React from 'react';
import FileUploader from "../../app/component/sampleUploader";

const Product:React.FC = () => {
    return (
        <>
            <div className="centers-element flex flex-col">
                <h4>File Uploader</h4>
                <div className="w-full  border border-green-600 my-2"></div>
                <FileUploader/>
            </div>
        </>
    );
};

export default Product;
