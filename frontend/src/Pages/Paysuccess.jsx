import React from 'react'
import { Link } from 'react-router'

const Paysuccess = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-3 py-6 sm:px-6">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl p-4 sm:p-6 lg:p-10 bg-white shadow-sm dark:bg-gray-900 rounded-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-green-100 rounded-full dark:bg-green-700">
                        <svg
                            className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-100"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-700 dark:text-green-400">
                        Payment Successful!
                    </h1>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-800 dark:text-gray-300">
                        Thank you for your purchase.
                    </p>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-blue-600 dark:text-blue-400">
                        Your tool{" "}
                        <span className="font-bold text-indigo-700 dark:text-indigo-400">
                            http://example.org/
                        </span>{" "}
                        will be listed shortly.
                    </p>
                    <p className="mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-400">
                        If you have any questions or need further assistance, feel free to contact us at:{" "}
                        <a
                            href="mailto:admin@eliteai.tools"
                            className="font-medium text-indigo-600 dark:text-indigo-400 underline"
                        >
                            admin@eliteai.tools
                        </a>
                    </p>
                </div>
                <div className="mt-6 sm:mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 text-base sm:text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Paysuccess
