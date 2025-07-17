import ImageKit from "imagekit";
import config from "../config/config.js";

var imagekit = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
});

export async function uploadFile(file, filename) {
    return new Promise((resolve, reject) => {

        imagekit.upload(
            {
                file: file.buffer,  //required // actual data buffer me hota h
                fileName: filename, //required
                folder: "Pixera"    // optional
            },
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

    });
}

/*
The uploadFile function is designed to upload an image file to a service called ImageKit. 

It takes two parameters:
    1.file: The actual file to upload
    2.filename: What you want to name the file when it's uploaded

Key Concepts

The function is marked as "async" and returns a "Promise"
    • This means it handles operations that take time to complete (like uploading files)
    • Promises help manage these time-consuming tasks without freezing your application

Promise Constructor
    • resolve: Called when everything works successfully
    • reject: Called when something goes wrong

How it Works Step by Step
    1.When you call uploadFile, it creates a new Promise
    2.Inside the Promise, it calls imagekit.upload with:
        The file data (stored in file.buffer)
        The desired filename
        A destination folder ("Pixera")
    3.If the upload succeeds, it calls resolve(result)
    4.If there's an error, it calls reject(error)

resolve and reject are functions that control the Promise's outcome
    • resolve(result): Indicates success and provides the result
    • reject(error): Indicates failure and provides the error
*/