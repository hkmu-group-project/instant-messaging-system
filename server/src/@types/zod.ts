import z from "zod";

const jsonResponseSchema = z.object({
    success: z.boolean(),
});

const createJsonSuccessResponseSchema = (data: z.ZodType) => {
    return z.object({
        success: z.literal(true),
        data,
    });
};

const createJsonResponseErrorSchema = (code: z.ZodType) => {
    return z.object({
        code,
        path: z.array(z.string()),
        message: z.string(),
    });
};

const createJsonFailureResponseSchema = (error: z.ZodType) => {
    return z.object({
        success: z.literal(false),
        errors: z.array(error),
    });
};

export {
    jsonResponseSchema,
    createJsonSuccessResponseSchema,
    createJsonResponseErrorSchema,
    createJsonFailureResponseSchema,
};
