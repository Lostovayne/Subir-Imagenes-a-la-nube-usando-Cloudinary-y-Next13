"use client";

import { useState } from "react";

const HomePage = () => {
    const [files, setFiles] = useState(null);
    const [imageUrl, setImagenUrl] = useState(null);

    return (
        <div>
            <form
                className="flex flex-col max-w-xs"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("image", files);

                    const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    setImagenUrl(data.url);
                }}
            >
                <input type="file" name="file" onChange={(e) => setFiles(e.target.files[0])} />
                <button type="submit" className="bg-white text-black py-2 px-6 rounded-lg">
                    Upload
                </button>
            </form>
            {imageUrl && (
                <img src={imageUrl} alt="imagen desde cloudinary" height={150} width={150} />
            )}
        </div>
    );
};
export default HomePage;
