import api from "./axiosClient";

//Authentication Endpoints
export const LOGIN_URL = "/api/v1/auth/login";
export const VERIFY_OTP_URL = "/api/v1/auth/verify_login_otp";
export const RESEND_OTP_URL = "/api/v1/auth/resend-otp";

//Gallery Endpoints
export const GALLERY_UPLOAD_URL = "/api/v1/media/galleryUpload";
export const GALLERY_GET_URL = "/api/v1/media/gallery";
export const GALLERY_DELETE_URL = "/api/v1/media/gallery";

export const GALLERY_DATATYPE_MAP = {
    PHOTOS: "photos",
    VIDEOS: "videos",
    WALLPAPERS: "wallpaper", // singular — backend requirement
};


/** POST /api/v1/auth/login */
export const loginApi = ({ email, password }) => {
    return api.post(LOGIN_URL, { email, password });
};

/** POST /api/v1/auth/verify_login_otp */
export const verifyOtpApi = ({ otp }) => {
    return api.post(VERIFY_OTP_URL, { otp });
};

/** POST /api/v1/auth/resend-otp */
export const resendOtpApi = (data) => {
    return api.post(RESEND_OTP_URL, data);
};


/**
 * POST /api/v1/media/galleryUpload
 * Upload a media file to Cloudinary via the backend.
 * @param {FormData} formData — must contain: file (File), dataType, title (optional ≥3 chars)
 */
export const galleryUploadApi = (formData) => {
    return api.post(GALLERY_UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

/**
 * GET /api/v1/media/gallery
 * Fetch paginated gallery items (public — no auth needed).
 * @param {{ page: number, dataType: string }} params
 */
export const galleryGetApi = ({ page = 1, dataType }) => {
    return api.get(GALLERY_GET_URL, {
        params: { page, dataType },
    });
};

/**
 * DELETE /api/v1/media/gallery/:id
 * Delete a gallery item by its MongoDB _id.
 * Requires authentication + valid session (cookie-based).
 * @param {string} id — Gallery document _id
 */
export const galleryDeleteApi = (id) => {
    return api.delete(`${GALLERY_DELETE_URL}/${id}`);
};

export default api;
