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

export const shringarUpdateApi = (id, formData, { onUploadProgress } = {}) => {
    return api.put(`${SHRINGAR_UPDATE_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

export const shringarActivateApi = (id) => {
    return api.patch(`${SHRINGAR_ACTIVATE_URL}/${id}`);
};

export const shringarDeleteApi = (id) => {
    return api.delete(`${SHRINGAR_REMOVE_URL}/${id}`);
};

export const shringarGetAllApi = () => {
    return api.get(SHRINGAR_ALL_URL);
};

export const shringarGetByIdApi = (id) => {
    return api.get(`${SHRINGAR_GET_URL}/${id}`);
};

// ─────────────────────────────────────────────
// Pooja Booking Endpoints
// ─────────────────────────────────────────────
export const POOJA_LIST_URL = "/api/v1/pooja/poojas";
export const POOJA_BOOK_URL = "/api/v1/pooja/book";
export const POOJA_VERIFY_URL = "/api/v1/pooja/verify";
export const POOJA_BOOKINGS_URL = "/api/v1/pooja/bookings";
export const POOJA_MANUAL_BOOKING_URL = "/api/v1/pooja/bookings/manual";
export const POOJA_ADD_URL = "/api/v1/pooja/add";
export const POOJA_UPDATE_URL = "/api/v1/pooja/update";
export const POOJA_REMOVE_URL = "/api/v1/pooja/remove";
export const POOJA_CATEGORIES_URL = "/api/v1/pooja/categories";

export const getAllPoojaApi = () => api.get(POOJA_LIST_URL);

export const bookPoojaApi = ({ poojaId, quantity, bookingDate, payer }) =>
    api.post(POOJA_BOOK_URL, { poojaId, quantity, bookingDate, payer });

export const verifyPoojaBookingApi = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) =>
    api.post(POOJA_VERIFY_URL, { razorpayOrderId, razorpayPaymentId, razorpaySignature });

export const getAllPoojaBookingsApi = (params = {}) =>
    api.get(POOJA_BOOKINGS_URL, { params });

export const addPoojaApi = (formData, { onUploadProgress } = {}) => {
    return api.post(POOJA_ADD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

export const updatePoojaApi = (id, formData, { onUploadProgress } = {}) => {
    return api.patch(`${POOJA_UPDATE_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

export const removePoojaApi = (id) => api.delete(`${POOJA_REMOVE_URL}/${id}`);

export const getPoojaCategoriesApi = () => api.get(POOJA_CATEGORIES_URL);

export const createManualPoojaBookingApi = ({ poojaId, quantity, bookingDate, amount, paymentMode, payer }) => {
    return api.post(POOJA_MANUAL_BOOKING_URL, {
        poojaId, quantity, bookingDate,
        ...(amount != null && amount !== "" ? { amount } : {}),
        ...(paymentMode ? { paymentMode } : {}),
        payer,
    });
};

export const updatePoojaBookingStatusApi = (id, status) =>
    api.patch(`${POOJA_BOOKINGS_URL}/${id}/status`, { status });

// ─────────────────────────────────────────────
// Room Booking Endpoints
// ─────────────────────────────────────────────
export const ROOM_LIST_URL         = "/api/v1/rooms/rooms";
export const ROOM_ADD_URL          = "/api/v1/rooms/add";
export const ROOM_UPDATE_URL       = "/api/v1/rooms/update";
export const ROOM_REMOVE_URL       = "/api/v1/rooms/remove";
export const ROOM_BOOK_URL         = "/api/v1/rooms/book";
export const ROOM_VERIFY_URL       = "/api/v1/rooms/verify";
export const ROOM_AVAILABILITY_URL = "/api/v1/rooms/availability";
export const ROOM_BOOKINGS_URL     = "/api/v1/rooms/bookings";

export const getAllRoomApi = () => api.get(ROOM_LIST_URL);

export const addRoomApi = (formData, { onUploadProgress } = {}) =>
    api.post(ROOM_ADD_URL, formData, { headers: { "Content-Type": "multipart/form-data" }, onUploadProgress });

export const updateRoomApi = (id, formData, { onUploadProgress } = {}) =>
    api.patch(`${ROOM_UPDATE_URL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" }, onUploadProgress });

export const removeRoomApi = (id) => api.delete(`${ROOM_REMOVE_URL}/${id}`);

export const getAllRoomBookingsApi = (params = {}) => api.get(ROOM_BOOKINGS_URL, { params });

export const checkInRoomBookingApi  = (id) => api.patch(`/api/v1/rooms/checkin/${id}`);
export const checkOutRoomBookingApi = (id) => api.patch(`/api/v1/rooms/checkout/${id}`);

export const getRoomAvailabilityApi = ({ checkIn, checkOut }) =>
    api.get(ROOM_AVAILABILITY_URL, { params: { checkIn, checkOut } });

export const bookRoomApi = ({ roomId, quantity, checkIn, checkOut, payer }) =>
    api.post(ROOM_BOOK_URL, { roomId, quantity, checkIn, checkOut, payer });

export const verifyRoomBookingApi = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) =>
    api.post(ROOM_VERIFY_URL, { razorpayOrderId, razorpayPaymentId, razorpaySignature });

// ─────────────────────────────────────────────
// Prasad Booking Endpoints
// ─────────────────────────────────────────────
export const PRASAD_LIST_URL     = "/api/v1/prasad/prasads";
export const PRASAD_BOOK_URL     = "/api/v1/prasad/book";
export const PRASAD_VERIFY_URL   = "/api/v1/prasad/verify";
export const PRASAD_BOOKINGS_URL = "/api/v1/prasad/bookings";

export const getAllPrasadApi = () => api.get(PRASAD_LIST_URL);

export const bookPrasadApi = ({ prasadId, quantity, payer, address }) =>
    api.post(PRASAD_BOOK_URL, { prasadId, quantity, payer, address });

export const verifyPrasadBookingApi = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) =>
    api.post(PRASAD_VERIFY_URL, { razorpayOrderId, razorpayPaymentId, razorpaySignature });

export const getAllPrasadBookingsApi = (params = {}) => api.get(PRASAD_BOOKINGS_URL, { params });

// ─────────────────────────────────────────────
// Payment / Donation Endpoints
// ─────────────────────────────────────────────
export const PAYMENT_ORDER_URL  = "/api/v1/payments/order";
export const PAYMENT_VERIFY_URL = "/api/v1/payments/verify";
export const PAYMENT_ALL_URL    = "/api/v1/payments/all";

export const createDonationOrderApi = ({ amount, payer, notes }) =>
    api.post(PAYMENT_ORDER_URL, { amount, purpose: "donation", payer, ...(notes ? { notes } : {}) });

export const verifyDonationApi = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) =>
    api.post(PAYMENT_VERIFY_URL, { razorpayOrderId, razorpayPaymentId, razorpaySignature });

export const getAllPaymentsApi = () => api.get(PAYMENT_ALL_URL);

export default api;
