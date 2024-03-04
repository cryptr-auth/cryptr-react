import React from 'react'
import { useCryptr } from '@cryptr/cryptr-react'

function SidebarNav() {
  const { logOut } = useCryptr()
  return (
    <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
      <div className="space-y-1 pb-8">
        <a
          href="/"
          className="bg-indigo-200 text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
          aria-current="page"
        >
          <svg
            className="text-gray-500 flex-shrink-0 -ml-1 mr-3 h-5 w-5"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5546 11.0456V21.8344C22.5538 22.1711 22.4624 22.5015 22.29 22.7908C22.1176 23.0802 21.8706 23.3178 21.5749 23.4789C21.3036 23.6284 20.9981 23.7048 20.6884 23.7005H15.0899C14.8425 23.7005 14.6051 23.6022 14.4302 23.4272C14.2552 23.2522 14.1569 23.0149 14.1569 22.7674V17.169C14.1569 16.9215 14.0586 16.6842 13.8836 16.5092C13.7086 16.3342 13.4713 16.2359 13.2238 16.2359H9.49147C9.244 16.2359 9.00667 16.3342 8.83168 16.5092C8.65669 16.6842 8.55839 16.9215 8.55839 17.169V22.7674C8.55839 23.0149 8.46008 23.2522 8.28509 23.4272C8.11011 23.6022 7.87277 23.7005 7.62531 23.7005H2.02683C1.7621 23.7015 1.50022 23.6458 1.2588 23.5372C1.01739 23.4285 0.802029 23.2695 0.627208 23.0707C0.323835 22.7122 0.158392 22.2573 0.160668 21.7877V11.0456C0.16075 10.7867 0.214715 10.5306 0.31913 10.2937C0.423546 10.0567 0.576127 9.8441 0.76717 9.66932L10.098 1.18996C10.442 0.875229 10.8914 0.700684 11.3576 0.700684C11.8239 0.700684 12.2733 0.875229 12.6173 1.18996L21.9481 9.66932C22.1391 9.8441 22.2917 10.0567 22.3961 10.2937C22.5005 10.5306 22.5545 10.7867 22.5546 11.0456Z"
              fill="currentColor"
            />
          </svg>

          <span className="truncate">Home</span>
        </a>

        <a
          href="/"
          className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
        >
          <svg
            className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-5 w-5"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3635 13.623L8.65481 16.2917C8.04102 16.9055 7.56066 17.666 7.41389 18.52C7.01359 20.9752 8.93502 23.0967 11.3635 23.0967C13.792 23.0967 15.7134 20.9752 15.3131 18.5334C15.1663 17.6794 14.6993 16.9055 14.0722 16.305L11.3635 13.623Z"
              fill="currentColor"
            />
            <path
              d="M16.1137 5.14999C14.5392 7.11145 11.3635 6.00396 11.3635 3.48209V1.44058C11.3635 0.373117 10.1759 -0.267358 9.29529 0.319744C6.18631 2.40129 0.688904 7.04473 0.688904 13.7564C0.688904 17.6526 2.77045 21.0551 5.87942 22.9098C5.38146 22.2045 5.02936 21.4069 4.84377 20.5637C4.65817 19.7205 4.64282 18.8487 4.79862 17.9995C5.05214 16.6118 5.79936 15.3576 6.81345 14.3702L10.4295 10.8075C10.9498 10.3005 11.7771 10.3005 12.2975 10.8075L15.9402 14.3968C16.9276 15.3709 17.6748 16.5985 17.915 17.9728C18.2486 19.7875 17.8216 21.4954 16.8876 22.8565C19.4095 21.322 21.2775 18.7734 21.8379 15.7845C22.6519 11.4213 20.7571 7.28491 17.5414 4.97653C17.1011 4.64295 16.4739 4.70967 16.1137 5.14999Z"
              fill="currentColor"
            />
          </svg>

          <span className="truncate">Popular</span>
        </a>

        <a
          href="/"
          className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
        >
          <svg
            className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.14918 4.12946C4.14918 3.25804 4.49535 2.4223 5.11154 1.80611C5.72773 1.18992 6.56347 0.84375 7.43489 0.84375C8.30632 0.84375 9.14205 1.18992 9.75824 1.80611C10.3744 2.4223 10.7206 3.25804 10.7206 4.12946C10.7206 5.00089 10.3744 5.83662 9.75824 6.45282C9.14205 7.06901 8.30632 7.41518 7.43489 7.41518C6.56347 7.41518 5.72773 7.06901 5.11154 6.45282C4.49535 5.83662 4.14918 5.00089 4.14918 4.12946ZM15.2861 6.73175L15.3551 6.78432C16.0522 7.30101 16.9253 7.52101 17.784 7.3963C18.6426 7.2716 19.4171 6.81232 19.9384 6.11869C20.4596 5.42507 20.6854 4.55341 20.5664 3.69394C20.4473 2.83448 19.9932 2.05699 19.303 1.53114C18.6128 1.0053 17.7427 0.773792 16.8825 0.88715C16.0222 1.00051 15.2417 1.44952 14.7114 2.13621C14.181 2.8229 13.9437 3.6915 14.0514 4.55246C14.1591 5.41342 14.6029 6.19684 15.2861 6.73175ZM9.51804 9.05804C9.72438 8.6673 10.0074 8.32221 10.3502 8.04339C10.693 7.76457 11.0885 7.55776 11.5131 7.43533C11.9377 7.3129 12.3826 7.27737 12.8212 7.33085C13.2598 7.38434 13.6831 7.52575 14.0659 7.74662C14.4486 7.96749 14.7828 8.26328 15.0485 8.61631C15.3143 8.96933 15.5061 9.37233 15.6125 9.8012C15.7189 10.2301 15.7377 10.676 15.6678 11.1123C15.5979 11.5486 15.4407 11.9663 15.2056 12.3405C14.7534 13.0602 14.0397 13.5767 13.2147 13.7814C12.3896 13.9861 11.5174 13.8631 10.7811 13.4382C10.0449 13.0133 9.50194 12.3196 9.26641 11.5028C9.03088 10.686 9.12107 9.80972 9.51804 9.05804ZM3.32775 9.05804H7.71418C7.4222 9.89188 7.35871 10.7887 7.53031 11.6553C7.70191 12.522 8.10234 13.3269 8.69004 13.9866H8.25632C7.40933 13.9865 6.58299 14.2481 5.89042 14.7357C5.19785 15.2233 4.67289 15.913 4.38739 16.7105C3.83594 16.4889 3.31962 16.1884 2.85461 15.8184C1.61918 14.8245 0.863464 13.3558 0.863464 11.5223C0.863464 10.8688 1.12309 10.242 1.58524 9.77981C2.04738 9.31767 2.67418 9.05804 3.32775 9.05804ZM16.4706 13.9866C17.3174 13.9866 18.1435 14.2483 18.8358 14.7359C19.528 15.2235 20.0527 15.9132 20.3379 16.7105C20.8965 16.4821 21.414 16.1848 21.8723 15.8184C23.1078 14.8245 23.8635 13.3558 23.8635 11.5223C23.8635 10.8688 23.6038 10.242 23.1417 9.77981C22.6796 9.31767 22.0527 9.05804 21.3992 9.05804H17.0128C17.1935 9.57225 17.292 10.1259 17.292 10.7009C17.2936 11.9135 16.8465 13.0838 16.0369 13.9866H16.4706ZM18.7493 17.154C18.8692 17.4432 18.9349 17.7619 18.9349 18.0938C18.9349 19.9272 18.1808 21.3959 16.9438 22.3898C15.7264 23.3673 14.0934 23.8438 12.3635 23.8438C10.6335 23.8438 9.00054 23.3673 7.78318 22.3898C6.54775 21.3959 5.79204 19.9272 5.79204 18.0938C5.79117 17.7699 5.85432 17.4491 5.97785 17.1497C6.10139 16.8503 6.28287 16.5783 6.51187 16.3493C6.74088 16.1203 7.01288 15.9388 7.31226 15.8153C7.61163 15.6917 7.93246 15.6286 8.25632 15.6295H16.4706C16.9587 15.6294 17.4358 15.7742 17.8415 16.0456C18.2472 16.317 18.5631 16.7028 18.7493 17.154Z"
              fill="#9CA0B8"
            />
          </svg>

          <span className="truncate">Communities</span>
        </a>

        <a
          href="/"
          className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
        >
          <svg
            className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-5 w-5"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1659 1.04869L7.4627 6.76481C7.0818 7.14657 6.86562 7.67279 6.86562 8.21964V18.5272C6.86562 19.6622 7.79212 20.5908 8.92452 20.5908H18.1896C19.0132 20.5908 19.7544 20.0956 20.0838 19.3424L23.4398 11.4904C24.3045 9.44747 22.8118 7.17753 20.5985 7.17753H14.7821L15.7601 2.45192C15.863 1.93603 15.7086 1.40981 15.338 1.03837C14.7306 0.439929 13.7629 0.439929 13.1659 1.04869ZM2.74781 20.5908C3.88021 20.5908 4.80671 19.6622 4.80671 18.5272V10.2729C4.80671 9.13793 3.88021 8.20932 2.74781 8.20932C1.61541 8.20932 0.688904 9.13793 0.688904 10.2729V18.5272C0.688904 19.6622 1.61541 20.5908 2.74781 20.5908Z"
              fill="currentColor"
            />
          </svg>

          <span className="truncate">Followed</span>
        </a>
      </div>
      <div className="pt-10">
        <p className="px-3 text-sm font-medium text-gray-500" id="communities-headline">
          Communities
        </p>
        <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
          <a
            href="/"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="truncate">Gaming</span>
          </a>

          <a
            href="/"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="truncate">Other</span>
          </a>

          <a
            href="/"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="truncate">Science</span>
          </a>

          <a
            href="/"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="truncate">Tech</span>
          </a>

          <a
            href="/"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="truncate">Anime</span>
          </a>

          <button
            onClick={() => logOut()}
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-blue-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="truncate">All</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default SidebarNav
