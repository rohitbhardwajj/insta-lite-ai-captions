const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: "public_q9Ji2iYhYOs4h92poLfzLIble34=",
    privateKey: "private_kO79TwlaqtMuiEgguL8Uitis/Ps=",
    urlEndpoint: "https://ik.imagekit.io/72xqhcqmo"
});

async function uploadToImagekit(file) {
    try {
        const result = await imagekit.upload({
            file: file,
            fileName: Math.floor(Math.random() * 100) + ".jpg",
            folder: "/images"
        });
        return result;
    } catch (error) {
        console.error("Upload Error:", error);
        throw error; // let the caller handle it
    }
}

module.exports = uploadToImagekit;
