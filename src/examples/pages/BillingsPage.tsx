import React, { ReactElement, useEffect, useState } from 'react'
import { useCryptr } from '../../lib'

const BillingsPage = (): ReactElement => {
  const [billings, setBillings] = useState([])
  const [accessToken, setAccessToken] = useState()
  const { decoratedRequest, isAuthenticated, isLoading, getCurrentAccessToken } = useCryptr()

  useEffect(() => {
    decoratedRequest({
      method: 'GET',
      url: 'http://localhost:8081/api/v1/billings',
    }).then((data) => {
      setBillings(data.data)
    })
  }, [decoratedRequest])

  useEffect(() => {
    setAccessToken(getCurrentAccessToken())
  }, [getCurrentAccessToken])
  return (
    <section aria-labelledby="billing_history_heading">
      <div className="bg-white pt-6 space-y-6  sm:overflow-hidden">
        <div className="px-4 sm:px-6">
          <h2 id="billing_history_heading" className="text-lg leading-6 font-bold text-gray-900">
            Billing history
          </h2>
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <strong>
              <span className="animate-spin mr-2">&#8278;</span>
              Loading
            </strong>
          ) : (
            <>
              {isAuthenticated() ? (
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  {accessToken && (
                    <div
                      style={{ maxWidth: '100%', overflowX: 'hidden' }}
                      className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                    >
                      <strong>Called with</strong> <br />
                      <p style={{ userSelect: 'all', WebkitUserSelect: 'all' }}>{accessToken}</p>
                    </div>
                  )}
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-t border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                            {/*
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            */}
                            <th
                              scope="col"
                              className="relative px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                              <span className="sr-only">View receipt</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200" x-max={1}>
                          {billings &&
                            billings.map((billing) => {
                              return (
                                <tr key={billing.date}>
                                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                    {billing.date}
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                    {billing.description}
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                    CA${billing.amount}
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                    <a
                                      href={billing.receiptUrl}
                                      rel="noreferrer"
                                      className="text-orange-600 hover:text-orange-900"
                                      target="_blank"
                                    >
                                      View receipt
                                    </a>
                                  </td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <strong>Please login first</strong>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default BillingsPage
