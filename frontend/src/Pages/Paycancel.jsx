import React from 'react'
import { Link } from 'react-router'

const Paycancel = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 px-3 py-6 sm:px-6">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl p-4 sm:p-6 lg:p-10 bg-white shadow-sm dark:bg-gray-900 rounded-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-yellow-100 rounded-full dark:bg-yellow-700">
                        <svg
                            className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 dark:text-yellow-100"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-yellow-700 dark:text-yellow-400">
                        Payment Canceled!
                    </h1>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-800 dark:text-gray-300">
                        Your transaction was canceled before completion.
                    </p>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-yellow-600 dark:text-yellow-400">
                        No charges were made. You can retry or explore other options.
                    </p>
                    <p className="mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-400">
                        For questions or support, contact:{" "}
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
                        className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 text-base sm:text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-yellow-600 to-orange-600 hover:scale-105 hover:from-yellow-700 hover:to-orange-700 dark:from-yellow-500 dark:to-orange-500 dark:hover:from-yellow-600 dark:hover:to-orange-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Paycancel
