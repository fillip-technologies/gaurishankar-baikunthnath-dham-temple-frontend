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
=======
// Pooja Booking Endpoints
// ─────────────────────────────────────────────
export const POOJA_LIST_URL = "/api/v1/pooja/poojas";
export const POOJA_BOOK_URL = "/api/v1/pooja/book";
export const POOJA_VERIFY_URL = "/api/v1/pooja/verify";
export const POOJA_BOOKINGS_URL = "/api/v1/pooja/bookings";
export const POOJA_MANUAL_BOOKING_URL = "/api/v1/pooja/bookings/manual";
export const POOJA_ADD_URL = "/api/v1/pooja/add";
export const POOJA_UPDATE_URL = "/api/v1/pooja/update"; // + /:id
export const POOJA_REMOVE_URL = "/api/v1/pooja/remove"; // + /:id
export const POOJA_CATEGORIES_URL = "/api/v1/pooja/categories"; // + /:id for delete

// ─────────────────────────────────────────────
// Pooja Booking API Functions
// ─────────────────────────────────────────────

/**
 * GET /api/v1/pooja/poojas
 * Fetch the bookable pooja catalogue (public — no auth needed).
 * Returns an array of { _id, poojaName, description, imageUrl, price }.
 */
export const getAllPoojaApi = () => {
    return api.get(POOJA_LIST_URL);
};

/**
 * POST /api/v1/pooja/book
 * Create a pooja booking + Razorpay order (public checkout). The server prices
 * the booking from the catalogue — the client only picks the pooja + quantity.
 * @param {{ poojaId: string, quantity: number, bookingDate: string, payer: { name: string, email: string, phone: string } }} data
 * @returns Razorpay handshake fields: { bookingId, poojaName, quantity, bookingDate, key, orderId, amount, currency, paymentId, payer }
 */
export const bookPoojaApi = ({ poojaId, quantity, bookingDate, payer }) => {
    return api.post(POOJA_BOOK_URL, { poojaId, quantity, bookingDate, payer });
};

/**
 * POST /api/v1/pooja/verify
 * Confirm the booking after Razorpay Checkout succeeds. Field names are the
 * camelCase form the backend expects (map from Razorpay's snake_case response).
 * @param {{ razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string }} data
 */
export const verifyPoojaBookingApi = ({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
}) => {
    return api.post(POOJA_VERIFY_URL, {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
    });
};

/**
 * GET /api/v1/pooja/bookings
 * Admin-only: list pooja bookings (newest first). Requires auth + valid session.
 * @param {{ status?: string, from?: string, to?: string, page?: number, limit?: number }} [params]
 * @returns { bookings, pagination }
 */
export const getAllPoojaBookingsApi = (params = {}) => {
    return api.get(POOJA_BOOKINGS_URL, { params });
};

/**
 * POST /api/v1/pooja/add
 * Admin-only: add a pooja to the bookable catalogue (multipart: image `file` +
 * fields). Requires auth + valid session. A category is required: send either
 * `category` (existing category id) or `categoryName` (creates it on the fly).
 * @param {FormData} formData — must contain: file (image), poojaName, price, and category|categoryName; description optional
 * @param {{ onUploadProgress?: (e: any) => void }} [config]
 */
export const addPoojaApi = (formData, { onUploadProgress } = {}) => {
    return api.post(POOJA_ADD_URL, formData, {
>>>>>>> 5266551353979f1b752b1552b1d6e4ddcbb51938
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
