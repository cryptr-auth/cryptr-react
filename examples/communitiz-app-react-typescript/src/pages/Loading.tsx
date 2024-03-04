import React from 'react'

const Loading = () => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative overflow-auto">
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center px-4 py-2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <img
                  className="h-10"
                  alt="spinner"
                  src="https://res.cloudinary.com/cryptr/image/upload/v1677141502/Cryptr%20badge/badge_protected_by_cryptr_white_without_icon_wmz9dn.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
