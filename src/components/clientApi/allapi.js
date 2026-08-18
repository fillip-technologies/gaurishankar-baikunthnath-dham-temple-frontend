import axios from "axios";

// VITE_API_BASE_URL can be set in .env for production or custom endpoint
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Relative path constants - axios prepends BASE_URL automatically
export const LOGIN_URL = "/api/v1/auth/login";
export const VERIFY_OTP_URL = "/api/v1/auth/verify_login_otp";
export const RESEND_OTP_URL = "/api/v1/auth/resend-otp";

export const loginApi = ({ email, password }) => {
    return api.post(LOGIN_URL, { email, password });
};

export const verifyOtpApi = ({ otp }) => {
    return api.post(VERIFY_OTP_URL, { otp });
};

export const resendOtpApi = (data) => {
    return api.post(RESEND_OTP_URL, data);
};
