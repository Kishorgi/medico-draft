import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const cNo = '424242424242'
const cvv = '123'

const PaymentGateway = () => {

     const { docId } = useParams()
         const { backendUrl, token } = useContext(AppContext)
     console.log(docId, '****')

     const navigate = useNavigate()

     const [name, setName] = useState('')
     const [cardNo, setCardNo] = useState('')
     const [cardCvv, setCardCvv] = useState('')

     const [appointments, setAppointments] = useState([])

     const handlePayment = () => {
        console.log(cNo, '*', cardNo, '*', cvv, cardCvv, '***')
        if (cNo === cardNo && cvv === cardCvv) {
            navigate(`/my-appointments/${docId}/success`)
        }
     }

     useEffect(() => {
        const getUserAppointments = async () => {
            try {
    
                const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
                setAppointments(data.appointments.reverse())
    
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

        getUserAppointments()
     }, [docId])
     

     const appointment = appointments.filter(a => a._id === docId)
     console.log(cardNo, '***')

    return (
        <section class="bg-white py-2 antialiased md:py-16">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Payment</h2>

      <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
        <form action="#" class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"style={{ backgroundColor: '#87CEEB' }}>
          <div class="mb-6 grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1">
              <label for="full_name" value={name} onChange={e => setName(e.target.value)} class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
              <input type="text" id="full_name" class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:bg-white dark:border-gray-300 dark:text-gray-900 dark:placeholder:text-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500" placeholder="JIBIN D JOSE" required />
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label for="card-number-input"  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
              <input type="text"value={cardNo} onChange={e => setCardNo(e.target.value)} id="card-number-input" class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:bg-white dark:border-gray-300 dark:text-gray-900 dark:placeholder:text-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
            </div>

            <div>
              <label for="card-expiration-input" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-white dark:border-gray-300 dark:text-gray-900 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
 placeholder="12/23" required />
              </div>
            </div>
            <div>
              <label for="cvv-input" class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                CVV*
                <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                  <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div id="cvv-desc" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  The last 3 digits on back of card
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </label>
              <input type="text" id="cvv-input" value={cardCvv} onChange={e => setCardCvv(e.target.value)} aria-describedby="helper-text-explanation" class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:bg-white dark:border-gray-300 dark:text-gray-900 dark:placeholder:text-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500" placeholder="•••" required />
            </div>
          </div>

          <button type="submit" onClick={e => {
            e.preventDefault()
            handlePayment()
          }} class="flex w-full items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-primary-700 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-white dark:text-primary-700 dark:hover:bg-purple-600 dark:hover:text-white dark:focus:ring-purple-800">
          Pay now
      </button>
      
        </form>

        <div class="mt-6 grow sm:mt-8 lg:mt-0">
          <div class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"style={{ backgroundColor: '#87CEEB' }}>
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Original price</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">₹{appointment?.[0]?.amount ?? 0}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Savings</dt>
                <dd class="text-base font-medium text-black-500">₹0.00</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Store Pickup</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">₹0</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">₹0</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">₹{appointment?.[0]?.amount ?? 0}</dd>
            </dl>
          </div>

          <div class="mt-6 flex items-center justify-center gap-8">
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}

export default PaymentGateway;