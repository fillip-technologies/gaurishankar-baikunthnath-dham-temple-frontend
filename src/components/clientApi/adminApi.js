import api from "./axiosClient";

export const CREATE_ADMIN_URL = "/api/v1/auth/create_admin";
export const REFRESH_TOKEN_URL = "/api/v1/auth/refresh_token";
export const UPDATE_PASSWORD_URL = "/api/v1/auth/update_password";
export const LIST_ADMINS_URL = "/api/v1/auth/admins";
export const ADMIN_PROFILE_URL = "/api/v1/auth/profile";
export const REMOVE_ADMIN_URL = "/api/v1/auth/remove_admin";


export const createAdminApi = ({ fullname, mobile_number, email, password }) => {
    return api.post(CREATE_ADMIN_URL, {
        fullname,
        mobile_number,
        email,
        password,
    });
};


export const refreshTokenApi = () => {
    return api.post(REFRESH_TOKEN_URL);
};


export const updatePasswordApi = ({ current_password, newpassword }) => {
    return api.patch(UPDATE_PASSWORD_URL, {
        current_password,
        newpassword,
    });
};


export const listAdminsApi = () => {
    return api.get(LIST_ADMINS_URL);
};


export const getAdminProfileApi = (id) => {
    return api.get(`${ADMIN_PROFILE_URL}/${id}`);
};

/**
 * DELETE /api/v1/auth/remove_admin
 * Auth: role === 'superadmin' required
 * @param {{ adminEmail: string, superAdminPassword: string }} data
 */
export const removeAdminApi = ({ adminEmail, superAdminPassword }) => {
    return api.delete(REMOVE_ADMIN_URL, {
        data: {
            adminEmail,
            superAdminPassword,
        },
    });
};

export default api;
