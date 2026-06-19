// import { auth } from "#/lib/auth";
// import { AUTH_LOGIN_PATH, isLoginPath, isPublicPath } from "#/lib/authPaths";
// import { redirect } from "@tanstack/react-router";
// import { createMiddleware } from "@tanstack/react-start";
// import { getRequestHeaders } from "@tanstack/react-start/server";

// export const authMiddleware = createMiddleware({ type: "request" }).server(

//     async ({ request, next }) => {
//         const { pathname } = new URL(request.url)
//         console.log("ssas", pathname)
//         const headers = getRequestHeaders()
//         const session = await auth.api.getSession({ headers })


//         if (isLoginPath(pathname)) {
//             if (session) throw redirect({ to: "/" })
//             return next()
//         }
//         if (isPublicPath(pathname)) return next()


//         if (!session) throw redirect({ to: AUTH_LOGIN_PATH })


//         return next({ context: { session } })




//     }
// )