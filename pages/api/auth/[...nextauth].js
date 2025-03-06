import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/user';
import { getServerSession } from "next-auth/next";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    await dbConnect();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error('No user found with this email');
                    }

                    const isValid = await compare(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error('Invalid password');
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    name: token.name,
                    firstName: token.firstName,
                    lastName: token.lastName
                };
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getServerSession(context.req, context.res, authOptions)
        },
    }
}

export default NextAuth(authOptions);