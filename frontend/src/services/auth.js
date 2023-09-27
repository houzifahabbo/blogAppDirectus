import {
    directus,
    bloggers
} from "./directus";

async function loginService(email, password) {
    let auth

    await directus.auth
        .login({
            email,
            password,
            mode: 'json'
        })
        .then(() => {
            auth = true;
        })
        .catch(() => {
            auth = false;
        });
    return auth;
}

async function logoutService(token) {

    await fetch("https://workable-admittedly-stallion.ngrok-free.app/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "refresh_token": token
        }),
    }).then((response) => {
        if (response.ok) {
            localStorage.clear();
            window.location.reload();
        } else {
            throw new Error("Something went wrong");
        }
    })
}

async function getAccessToken() {
    return await directus.auth.token
}

async function signupService(email, firstName, lastName) {
    return await bloggers.createOne({
        email: email,
        firstName: firstName,
        lastName: lastName,
    });
}

async function invitesAcceptService(accessToken, password) {
    return await directus.users.invites.accept(accessToken, password)
}

async function forgotPasswordService(email) {
    await directus.auth.password.request(
        email,
        'http://blog-app-website.s3-website.eu-north-1.amazonaws.com/reset-password'
    );
}

async function resetPasswordService(token, password) {
    return await directus.auth.password.reset(token, password)
}

async function getUser() {
    return await directus.users.me.read().catch((error) => {
        return error;
    });
}

const authServices = {
    loginService,
    logoutService,
    getAccessToken,
    signupService,
    invitesAcceptService,
    forgotPasswordService,
    resetPasswordService,
    getUser
};

export default authServices;