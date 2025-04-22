import React, { useState } from 'react';

const Upload = ({ onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                onImageUpload && onImageUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mb-4">
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-32 p-2 group text-center">
                    <div className="h-full w-full flex flex-col items-center justify-center">
                        {imagePreview ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-gray-400">
                                    Drag and drop an image or click to select
                                </p>
                                <div className="mt-2">
                                    <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                            </>
                        )}
                    </div>
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
            </div>
        </div>
    );
};

export default Upload;
