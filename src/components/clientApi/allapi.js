import api from "./axiosClient";

// ─────────────────────────────────────────────
// Authentication Endpoints
// ─────────────────────────────────────────────
export const LOGIN_URL = "/api/v1/auth/login";
export const VERIFY_OTP_URL = "/api/v1/auth/verify_login_otp";
export const RESEND_OTP_URL = "/api/v1/auth/resend-otp";
export const LOGOUT_URL = "/api/v1/auth/logout";

// ─────────────────────────────────────────────
// Gallery Endpoints
// ─────────────────────────────────────────────
export const GALLERY_UPLOAD_URL = "/api/v1/media/galleryUpload";
export const GALLERY_GET_URL = "/api/v1/media/gallery";
export const GALLERY_FOLDERS_URL = "/api/v1/media/gallery/folders";
export const GALLERY_DELETE_URL = "/api/v1/media/gallery";

export const GALLERY_DATATYPE_MAP = {
    PHOTOS: "photos",
    VIDEOS: "videos",
    WALLPAPERS: "wallpaper",
};

// ─────────────────────────────────────────────
// Media Coverage Endpoints
// ─────────────────────────────────────────────
export const MEDIA_URL = "/api/v1/media/mediaCoverage";

// ─────────────────────────────────────────────
// Shringar Endpoints
// ─────────────────────────────────────────────
export const SHRINGAR_CREATE_URL = "/api/v1/shringar/create";
export const SHRINGAR_REMOVE_URL = "/api/v1/shringar/remove"; // /api/v1/shringar/remove/:id
export const SHRINGAR_ALL_URL = "/api/v1/shringar/all";
export const SHRINGAR_GET_URL = "/api/v1/shringar"; // /api/v1/shringar/:id

// ─────────────────────────────────────────────
// Authentication API Functions
// ─────────────────────────────────────────────

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
 * POST /api/v1/auth/logout
 * Clears refreshToken + sessionId in DB; clears cookies
 */
export const logOutApi = () => {
    return api.post(LOGOUT_URL);
};

// ─────────────────────────────────────────────
// Gallery API Functions
// ─────────────────────────────────────────────

/**
 * POST /api/v1/media/galleryUpload
 * Upload a media file to Cloudinary via the backend.
 * @param {FormData} formData — must contain: file (File), dataType, title (optional ≥3 chars)
 * @param {{ onUploadProgress?: (progressEvent: any) => void }} [config] — axios upload hooks
 */
export const galleryUploadApi = (formData, { onUploadProgress } = {}) => {
    return api.post(GALLERY_UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/**
 * GET /api/v1/media/gallery
 * Fetch paginated gallery items (public — no auth needed).
 * Pass `folder` to restrict results to a single folder.
 * @param {{ page: number, dataType: string, folder?: string }} params
 */
export const galleryGetApi = ({ page = 1, dataType, folder }) => {
    return api.get(GALLERY_GET_URL, {
        params: { page, dataType, ...(folder ? { folder } : {}) },
    });
};

/**
 * GET /api/v1/media/gallery/folders
 * Fetch the list of folders for a dataType (public — no auth needed).
 * Returns [{ folder, count, coverThumbUrl }].
 * @param {{ dataType: string }} params
 */
export const galleryFoldersApi = ({ dataType }) => {
    return api.get(GALLERY_FOLDERS_URL, {
        params: { dataType },
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

// ─────────────────────────────────────────────
// Media Coverage API Functions
// ─────────────────────────────────────────────

/**
 * POST /api/v1/media/mediaCoverage
 * Create a media coverage article (multipart: file + fields). Auth required.
 * @param {FormData} formData
 * @param {{ onUploadProgress?: (e: any) => void }} [config]
 */
export const mediaCreateApi = (formData, { onUploadProgress } = {}) => {
    return api.post(MEDIA_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/**
 * PATCH /api/v1/media/mediaCoverage/:id
 * Update an article (multipart: optional new file + changed fields). Auth required.
 */
export const mediaUpdateApi = (id, formData, { onUploadProgress } = {}) => {
    return api.patch(`${MEDIA_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/** GET /api/v1/media/mediaCoverage — all articles (public). */
export const mediaGetAllApi = () => {
    return api.get(MEDIA_URL);
};

/** GET /api/v1/media/mediaCoverage/:id — single article (public). */
export const mediaGetApi = (id) => {
    return api.get(`${MEDIA_URL}/${id}`);
};

/** DELETE /api/v1/media/mediaCoverage?id=<id> — delete article. Auth required. */
export const mediaDeleteApi = (id) => {
    return api.delete(MEDIA_URL, { params: { id } });
};

// ─────────────────────────────────────────────
// Shringar API Functions
// ─────────────────────────────────────────────

/**
 * POST /api/v1/shringar/create
 * Adds a shringar (deity adornment) image uploaded to Cloudinary.
 * Access: Auth + Session
 * Content-Type: multipart/form-data
 * @param {FormData} formData - must contain `file` (File, required) and optional `title` (string >= 3 chars)
 * @param {{ onUploadProgress?: (progressEvent: any) => void }} [config]
 */
export const shringarCreateApi = (formData, { onUploadProgress } = {}) => {
    return api.post(SHRINGAR_CREATE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/**
 * DELETE /api/v1/shringar/remove/:id
 * Remove a shringar document and delete its image from Cloudinary.
 * Access: Auth + Session
 * @param {string} id - Shringar document _id
 */
export const shringarDeleteApi = (id) => {
    return api.delete(`${SHRINGAR_REMOVE_URL}/${id}`);
};

/**
 * GET /api/v1/shringar/all
 * Fetch all shringar records (newest first).
 * Access: Public
 */
export const shringarGetAllApi = () => {
    return api.get(SHRINGAR_ALL_URL);
};

/**
 * GET /api/v1/shringar/:id
 * Fetch shringar by id (returns the shringar / most recent).
 * Access: Public
 * @param {string} id - Required path param
 */
export const shringarGetByIdApi = (id) => {
    return api.get(`${SHRINGAR_GET_URL}/${id}`);
};

export default api;
