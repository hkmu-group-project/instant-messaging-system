import { ObjectId } from "mongodb";
import { z } from "zod";

const objectIdSchema = z
    .string()
    .describe("ObjectId")
    .regex(/^[0-9a-fA-F]{24}$/, {
        message: "Invalid ObjectId",
    })
    .transform((val) => new ObjectId(val));

const jsonResponseSchema = z.object({
    success: z.boolean(),
});

const createJsonSuccessResponseSchema = (data: z.ZodType) => {
    return z.object({
        success: z.literal(true),
        data,
    });
};

const createJsonResponseErrorSchema = (code: z.ZodType, message: z.ZodType) => {
    return z.object({
        code,
        path: z.array(z.string()),
        message,
    });
};

const createJsonFailureResponseSchema = (error: z.ZodType) => {
    return z.object({
        success: z.literal(false),
        errors: z.array(error),
    });
};

export {
    objectIdSchema,
    jsonResponseSchema,
    createJsonSuccessResponseSchema,
    createJsonResponseErrorSchema,
    createJsonFailureResponseSchema,
};
