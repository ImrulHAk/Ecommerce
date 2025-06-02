import React from 'react'
import { Link } from 'react-router'

const Payfailed = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-3">
            <div className="w-full max-w-2xl p-4 bg-white shadow-sm dark:bg-gray-900 sm:p-10 !rounded-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full dark:bg-red-700">
                        <svg
                            className="h-12 w-12 text-red-600 dark:text-red-100"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extrabold text-red-700 dark:text-red-400">
                        Payment Failed!
                    </h1>
                    <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
                        Oops! Something went wrong with your transaction.
                    </p>
                    <p className="mt-6 text-xl text-red-600 dark:text-red-400">
                        Please try again or contact support for assistance.
                    </p>
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                        Need help? Reach out at:
                        <a
                            href="mailto:admin@eliteai.tools"
                            className="font-medium text-indigo-600 dark:text-indigo-400 underline"
                        >
                            admin@eliteai.tools
                        </a>
                    </p>
                </div>
                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105 hover:from-red-700 hover:to-pink-700 dark:from-red-500 dark:to-pink-500 dark:hover:from-red-600 dark:hover:to-pink-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Payfailed