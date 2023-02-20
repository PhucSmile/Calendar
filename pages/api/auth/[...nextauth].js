import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.JWT_SECRET,
    // callbacks: {
    //     async jwt({ token, user, account }) {
    //         // console.log('account', account);
    //         console.log('token', token);
    //         console.log('user', user);
    //         try {
    //             if (user) {
    //                 token.accessToken = token.accessToken;
    //                 token.accessTokenExpiry = user.expiresIn;
    //                 token.user = user;
    //             }

    //             return token;
    //         } catch (error) {
    //             return token;
    //         }
    //     },
    //     async session({ session, token }) {
    //         session.accessToken = token.accessToken;
    //         session.user = token.user;

    //         return session;
    //     },
    // },
});
