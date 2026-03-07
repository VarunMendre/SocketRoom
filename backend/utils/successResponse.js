export const successResponse = (res, data = null, message = "", statusCode = 200) => {
    // Handle case where data is an array and we want to return it directly for legacy support
    if (Array.isArray(data) && !message) {
        return res.status(statusCode).json(data);
    }

    const response = {
        success: true,
    };

    if (message) response.message = message;

    if (data !== null) {
        // Convert Mongoose documents to plain objects to avoid leaking internal properties
        const plainData = data?.toJSON ? data.toJSON() : data;

        if (typeof plainData === "object" && !Array.isArray(plainData)) {
            // Merge data into response to keep it at top level (preserves structure)
            Object.assign(response, plainData);
        } else {
            response.data = plainData;
        }
    }

    return res.status(statusCode).json(response);
};

export const errorResponse = (res, error = "Something went wrong", statusCode = 500, extra = {}) => {
    const response = {
        success: false,
        error: typeof error === "string" ? error : error.message || "Internal Server Error",
    };

    // Merge extra data (custom messages, fieldErrors, etc.)
    if (extra && typeof extra === "object") {
        Object.assign(response, extra);
    }

    // Also check if the 'error' object itself has extra fields (like fieldErrors)
    if (typeof error === "object" && error !== null) {
        for (const [key, value] of Object.entries(error)) {
            if (key !== "message" && !response[key]) {
                response[key] = value;
            }
        }
    }

    return res.status(statusCode).json(response);
};
