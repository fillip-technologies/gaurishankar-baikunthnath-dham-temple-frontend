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
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/**
 * PATCH /api/v1/pooja/update/:id
 * Admin-only: update a catalogue pooja (multipart: optional new image + changed
 * fields). At least one field/file must be present. Requires auth + valid session.
 */
export const updatePoojaApi = (id, formData, { onUploadProgress } = {}) => {
    return api.patch(`${POOJA_UPDATE_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/**
 * DELETE /api/v1/pooja/remove/:id
 * Admin-only: remove a pooja from the catalogue. Requires auth + valid session.
 */
export const removePoojaApi = (id) => {
    return api.delete(`${POOJA_REMOVE_URL}/${id}`);
};

/**
 * GET /api/v1/pooja/categories
 * List pooja categories (public). Returns [{ _id, name }]. Categories are
 * read-only: they are created when a pooja is added under a new category name
 * (send `categoryName` to addPoojaApi) and auto-deleted when their last pooja is
 * removed — there are no create/delete category endpoints.
 */
export const getPoojaCategoriesApi = () => {
    return api.get(POOJA_CATEGORIES_URL);
};

/**
 * POST /api/v1/pooja/bookings/manual
 * Admin-only: record an offline pooja booking (cash/UPI at the counter). Requires
 * auth + valid session. The server prices from the catalogue unless `amount`
 * (rupees) is supplied. The booking is stored already confirmed.
 * @param {{ poojaId: string, quantity: number, bookingDate: string, amount?: number, paymentMode?: string, payer: { name: string, email?: string, phone: string } }} data
 */
export const createManualPoojaBookingApi = ({
    poojaId,
    quantity,
    bookingDate,
    amount,
    paymentMode,
    payer,
}) => {
    return api.post(POOJA_MANUAL_BOOKING_URL, {
        poojaId,
        quantity,
        bookingDate,
        ...(amount != null && amount !== "" ? { amount } : {}),
        ...(paymentMode ? { paymentMode } : {}),
        payer,
    });
};

/**
 * PATCH /api/v1/pooja/bookings/:id/status
 * Admin-only: transition a booking's status. `status` must be one of
 * "confirmed" | "completed" | "cancelled". Requires auth + valid session.
 * @param {string} id — PoojaBooking _id
 * @param {"confirmed"|"completed"|"cancelled"} status
 */
export const updatePoojaBookingStatusApi = (id, status) => {
    return api.patch(`${POOJA_BOOKINGS_URL}/${id}/status`, { status });
};

// ─────────────────────────────────────────────
// Room (Hotel) Catalogue Endpoints
// NOTE: the room router is mounted at /api/v1/rooms (plural), and its list route
// is /rooms — so the full catalogue URL is /api/v1/rooms/rooms.
// ─────────────────────────────────────────────
export const ROOM_LIST_URL = "/api/v1/rooms/rooms";
export const ROOM_ADD_URL = "/api/v1/rooms/add";
export const ROOM_UPDATE_URL = "/api/v1/rooms/update"; // + /:id
export const ROOM_REMOVE_URL = "/api/v1/rooms/remove"; // + /:id
export const ROOM_BOOK_URL = "/api/v1/rooms/book";
export const ROOM_VERIFY_URL = "/api/v1/rooms/verify";
export const ROOM_AVAILABILITY_URL = "/api/v1/rooms/availability";
export const ROOM_BOOKINGS_URL = "/api/v1/rooms/bookings";
export const PRASAD_BOOKINGS_URL = "/api/v1/prasad/bookings";

// ─────────────────────────────────────────────
// Room Catalogue API Functions
// ─────────────────────────────────────────────

/**
 * GET /api/v1/rooms/rooms
 * Fetch the bookable room-type catalogue (public — no auth needed).
 * Returns an array of { _id, roomType, description, facilities, imageUrl, price, totalRooms, availableRooms }.
 */
export const getAllRoomApi = () => {
    return api.get(ROOM_LIST_URL);
};

/**
 * POST /api/v1/rooms/add
 * Admin-only: add a room type to the catalogue (multipart: image `file` + fields).
 * `facilities` may be a comma/newline separated string. Requires auth + valid session.
 * @param {FormData} formData — must contain: file (image), roomType, price, totalRooms; description/facilities optional
 * @param {{ onUploadProgress?: (e: any) => void }} [config]
 */
export const addRoomApi = (formData, { onUploadProgress } = {}) => {
    return api.post(ROOM_ADD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/**
 * PATCH /api/v1/rooms/update/:id
 * Admin-only: update a catalogue room type (multipart: optional new image + changed
 * fields). At least one field/file must be present. Requires auth + valid session.
 */
export const updateRoomApi = (id, formData, { onUploadProgress } = {}) => {
    return api.patch(`${ROOM_UPDATE_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });
};

/**
 * DELETE /api/v1/rooms/remove/:id
 * Admin-only: remove a room type from the catalogue. Requires auth + valid session.
 */
export const removeRoomApi = (id) => {
    return api.delete(`${ROOM_REMOVE_URL}/${id}`);
};

/**
 * GET /api/v1/rooms/bookings
 * Admin-only: list room bookings (newest first). Requires auth + valid session.
 * @param {{ status?: string, stayStatus?: string, from?: string, to?: string, page?: number, limit?: number }} [params]
 * @returns { bookings, pagination }
 */
export const getAllRoomBookingsApi = (params = {}) => {
    return api.get(ROOM_BOOKINGS_URL, { params });
};

/**
 * PATCH /api/v1/rooms/checkin/:id
 * Admin-only: check a confirmed booking in (decrements room availability, sets
 * stayStatus = checked_in). Requires auth + valid session.
 * @param {string} id — RoomBooking _id
 */
export const checkInRoomBookingApi = (id) => {
    return api.patch(`/api/v1/rooms/checkin/${id}`);
};

/**
 * PATCH /api/v1/rooms/checkout/:id
 * Admin-only: check a booking out (returns the room to the pool, sets
 * stayStatus = checked_out). Requires auth + valid session.
 * @param {string} id — RoomBooking _id
 */
export const checkOutRoomBookingApi = (id) => {
    return api.patch(`/api/v1/rooms/checkout/${id}`);
};

/**
 * GET /api/v1/prasad/bookings
 * Admin-only: list prasad bookings (newest first). Requires auth + valid session.
 * @param {{ status?: string, from?: string, to?: string, page?: number, limit?: number }} [params]
 * @returns { bookings, pagination }
 */
export const getAllPrasadBookingsApi = (params = {}) => {
    return api.get(PRASAD_BOOKINGS_URL, { params });
};

/**
 * GET /api/v1/rooms/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
 * Public: the room catalogue with per-date-range availability. Each item is a
 * room doc plus `available` (rooms free for EVERY night of the range) and
 * `nights`. Used to price and gate the booking cards for the chosen dates.
 * @param {{ checkIn: string, checkOut: string }} params
 */
export const getRoomAvailabilityApi = ({ checkIn, checkOut }) => {
    return api.get(ROOM_AVAILABILITY_URL, { params: { checkIn, checkOut } });
};

/**
 * POST /api/v1/rooms/book
 * Create a room booking + Razorpay order (public checkout). The server prices the
 * booking (price × quantity × nights) and enforces date-range availability — the
 * client only picks the room type, quantity and stay dates.
 * @param {{ roomId: string, quantity: number, checkIn: string, checkOut: string, payer: { name: string, email: string, phone: string } }} data
 * @returns Razorpay handshake fields: { bookingId, roomType, quantity, nights, checkIn, checkOut, key, orderId, amount, currency, paymentId, payer }
 */
export const bookRoomApi = ({ roomId, quantity, checkIn, checkOut, payer }) => {
    return api.post(ROOM_BOOK_URL, { roomId, quantity, checkIn, checkOut, payer });
};

/**
 * POST /api/v1/rooms/verify
 * Confirm the booking after Razorpay Checkout succeeds. Map Razorpay's snake_case
 * response fields to the camelCase names the backend expects.
 * @param {{ razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string }} data
 */
export const verifyRoomBookingApi = ({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
}) => {
    return api.post(ROOM_VERIFY_URL, {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
    });
};

// ─────────────────────────────────────────────
// Payments / Donation Endpoints
// The payments module is generic: any purpose ("booking" | "donation" | "general")
// flows through the same order + verify pair. A standalone donation sets
// `purpose: "donation"` so the Payment record is filed under donations.
// ─────────────────────────────────────────────
export const PAYMENT_ORDER_URL = "/api/v1/payments/order";
export const PAYMENT_VERIFY_URL = "/api/v1/payments/verify";

/**
 * POST /api/v1/payments/order
 * Create a Razorpay order for a standalone donation (public checkout). Unlike the
 * booking flows the server does NOT price this — the donor chooses the amount, so
 * pass it here in the smallest currency unit (paise, e.g. ₹500 → 50000).
 * `purpose` is forced to "donation" so the saved Payment is filed correctly.
 * @param {{ amount: number, payer: { name: string, email: string, phone: string }, notes?: Record<string,string> }} data
 * @returns Razorpay handshake fields: { key, orderId, amount, currency, paymentId, payer }
 */
export const createDonationOrderApi = ({ amount, payer, notes }) => {
    return api.post(PAYMENT_ORDER_URL, {
        amount,
        purpose: "donation",
        payer,
        ...(notes ? { notes } : {}),
    });
};

/**
 * POST /api/v1/payments/verify
 * Confirm the donation after Razorpay Checkout succeeds. Map Razorpay's snake_case
 * response fields to the camelCase names the backend expects.
 * @param {{ razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string }} data
 */
export const verifyDonationApi = ({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
}) => {
    return api.post(PAYMENT_VERIFY_URL, {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
    });
};

export const PAYMENT_ALL_URL = "/api/v1/payments/all";

/**
 * GET /api/v1/payments/all
 * Admin-only: list every payment (newest first). Requires auth + valid session
 * (superadmin / accountant). The endpoint returns all purposes, so filter by
 * `purpose` on the client for a donations-only ledger.
 * @returns Payment[] — each { _id, amount (paise), currency, payer, purpose, status, razorpayPaymentId, notes, createdAt, ... }
 */
export const getAllPaymentsApi = () => {
    return api.get(PAYMENT_ALL_URL);
};

export default api;
