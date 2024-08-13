import { Request, Response } from "express";
import { promisify } from "util";
import crypto from "crypto";
import { CMSBucketName, S3Client } from "utils/aws/s3Client";

export async function GenerateUploadURL(req: Request, res: Response) {
    const randomBytes = promisify(crypto.randomBytes);
    const objName = (await randomBytes(16)).toString("hex");
    const params = {
        Bucket: CMSBucketName,
        Key: objName,
        Expires: 30 * 60,
    };

    const uploadURL = await S3Client.getSignedUrlPromise("putObject", params);
    res.status(200).json({
        status: "success",
        url: uploadURL,
    });
}
