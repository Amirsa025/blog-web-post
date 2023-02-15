import React, {ChangeEvent, useState} from 'react';


const FileUploader = () => {
    const [preview, setPreview] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = React.useState<File>()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
        if (!event.target.files) return;
           setPreview(event.target.files[0]);
    };
    const handleUploadClick = () => {
        if (!file) {
            return;
        }
        setLoading(true)
        // 👇 Uploading the file using the fetch API to the server
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            // 👇 Set headers manually for single file upload
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`, // 👈 Headers need to be a string
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
        setLoading(false)
    };
    return (
        <div className="flex flex-col centers-element">
            <h4 className="font-semibold text-[1.5rem]">File Uploader</h4>
            <input onChange={handleChange} type="file" multiple={true} accept="image/*"/>
            <button onClick={handleUploadClick} disabled={loading}      className={`${
                loading ? "bg-gray-400" : " bg-green-500"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>  {loading ? "Loading..." : `Upload File`}</button>
            <img
                style={{ width: "300px", objectFit: "cover", borderRadius: "4px" }}
                src={preview === null ? "" : URL.createObjectURL(preview)}
                alt=""
            />
        </div>
    );
};

export default FileUploader
