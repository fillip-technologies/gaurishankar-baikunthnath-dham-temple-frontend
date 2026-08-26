import axios from "axios";

// Single source of truth for Base URL across the entire application
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// ─────────────────────────────────────────────
// Silent session refresh on 401
// ─────────────────────────────────────────────
// The admin dashboard caches its "logged in" state in localStorage, which can
// outlive the backend access-token cookie. When an authenticated request gets a
// 401 we transparently try to renew the session via /refresh_token (using the
// longer-lived refresh cookie) and replay the original request. Only if the
// refresh itself fails do we clear the stale auth state and bounce to login.
//
// The backend ROTATES the refresh token on every call, so two concurrent 401s
// must not each hit /refresh_token (the second would send an already-rotated
// token and be rejected). We therefore allow a single refresh in flight and
// queue every other failed request until it resolves.
const AUTH_ENDPOINTS = ["/api/v1/auth/login", "/api/v1/auth/verify_login_otp"];
const REFRESH_URL = "/api/v1/auth/refresh_token";
const LOGIN_ROUTE = "/admin/login";

let isRefreshing = false;
let waiters = [];

// Release every request queued behind an in-flight refresh. `error` set → the
// refresh failed, so reject them; otherwise let them retry.
const flushWaiters = (error) => {
    waiters.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
    waiters = [];
};

const forceLogout = () => {
    try {
        localStorage.removeItem("mandir_admin_user");
        localStorage.removeItem("mandir_admin_token");
    } catch {
        /* ignore storage errors */
    }
    if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith(LOGIN_ROUTE)
    ) {
        window.location.assign(LOGIN_ROUTE);
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const original = error?.config;
        const url = original?.url || "";

        if (status !== 401 || !original) return Promise.reject(error);

        // Login / OTP failures belong to the caller (wrong password, bad OTP…).
        if (AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint))) {
            return Promise.reject(error);
        }

        // The refresh call itself 401'd → the session is truly gone; let the
        // outer handler below perform the logout.
        if (url.includes(REFRESH_URL)) {
            return Promise.reject(error);
        }

        // Already refreshed once for this request and still 401 → give up.
        if (original._retry) {
            forceLogout();
            return Promise.reject(error);
        }
        original._retry = true;

        // A refresh is in flight — wait for it, then replay this request.
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                waiters.push({
                    resolve: () => resolve(api(original)),
                    reject,
                });
            });
        }

        isRefreshing = true;
        try {
            await api.post(REFRESH_URL); // rotates + sets fresh cookies
            isRefreshing = false;
            flushWaiters();
            return api(original);
        } catch (refreshError) {
            isRefreshing = false;
            flushWaiters(refreshError);
            forceLogout();
            return Promise.reject(refreshError);
        }
    },
);

export default api;
