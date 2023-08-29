import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { writeFileSync } from "fs";

cloudinary.config({
    cloud_name: "-------------",
    api_key: "------------------------",
    api_secret: "-------------------",
});

export async function POST(request) {
    const data = await request.formData();
    const image = data.get("image");

    if (!image.name) {
        return NextResponse.json("no se ha subido ninguna imagen");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //guardar en un archivo en nuestro pc
    // const filepath = path.join(process.cwd(), "public", image.name);
    // writeFileSync(filepath, buffer);

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({}, async (error, response) => {
                if (error) {
                    return reject(error);
                }

                resolve(response);
            })
            .end(buffer);
    });

    return NextResponse.json({
        url: response.secure_url,
    });
}
