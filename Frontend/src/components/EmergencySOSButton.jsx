import React from 'react'

export default function EmergencySOSButton() {
  const sendSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords
        const message = `EMERGENCY! I need help!\nLocation: https://maps.google.com/?q=${latitude},${longitude}`
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`
        window.open(whatsappURL, '_blank')
        setTimeout(() => window.location.href = 'tel:108', 1500)
      })
    }
  }

  return (
    <button
      onClick={sendSOS}
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 bg-red-600 text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 shadow-2xl flex items-center justify-center text-2xl sm:text-4xl font-bold z-50 animate-pulse hover:animate-none hover:scale-110 transition-all duration-200"
      aria-label="Emergency SOS"
    >
      SOS
    </button>
  )
}