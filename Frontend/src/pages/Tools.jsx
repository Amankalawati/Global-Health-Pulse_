import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Droplets, 
  HeartPulse, 
  Syringe, 
  Brain, 
  Siren, 
  Thermometer,
  ShieldCheck,
  Plane,
  Home,
  Stethoscope
} from 'lucide-react'   // Free & beautiful icons

const ToolCard = ({ title, subtitle, gradient, icon: Icon, link }) => {
  return (
    <Link to={link} className="block group">
      <div className={`relative overflow-hidden rounded-3xl p-8 text-white h-full transform transition-all duration-300 group-hover:scale-105 shadow-2xl ${gradient} flex flex-col`}>
        {/* Icon at top-right */}
        <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-50 transition">
          <Icon size={80} strokeWidth={1.5} />
        </div>

        {/* Main content */}
        <div className="relative z-10 mt-16">
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
            {title}
          </h3>
          <p className="mt-4 text-lg md:text-xl font-medium opacity-95 drop-shadow">
            {subtitle}
          </p>
        </div>

        {/* Arrow */}
        <div className="mt-auto ml-auto text-5xl opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
          →
        </div>
      </div>
    </Link>
  )
}

export default function Tools() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900">Health Tools</h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
            Your complete 2025 guide to staying safe — backed by WHO, CDC & real-time data
          </p>
          <div className="mt-8 inline-block">
            <span className="bg-green-100 text-green-800 px-8 py-3 rounded-full text-lg font-bold shadow-lg">
              Updated November 2025
            </span>
          </div>
        </div>

        {/* Tools Grid with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <ToolCard
            title="Blood Bank Live Status"
            subtitle="Search city & blood group — see urgent needs now"
            gradient="bg-gradient-to-br from-red-500 to-pink-600"
            icon={Droplets}
            link="/tools/blood-bank"
          />

          <ToolCard
            title="Hospital Beds & Oxygen"
            subtitle="Real-time ICU, ventilator & oxygen near you"
            gradient="bg-gradient-to-br from-red-600 to-orange-600"
            icon={HeartPulse}
            link="/tools/hospital-finder"
          />

          <ToolCard
            title="Vaccination Checker"
            subtitle="Missing shots? Find clinics instantly"
            gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
            icon={Syringe}
            link="/tools/vaccine-checker"
          />

          <ToolCard
            title="Mental Health First-Aid"
            subtitle="2-minute check for stress & anxiety"
            gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
            icon={Brain}
            link="/tools/mental-health"
          />

          <ToolCard
            title="Emergency SOS"
            subtitle="One tap → family + 108 ambulance alerted"
            gradient="bg-gradient-to-br from-red-700 to-rose-700"
            icon={Siren}
            link="/tools/sos"
          />

          <ToolCard
            title="Fever Tracker"
            subtitle="Daily logs → early dengue/malaria alerts"
            gradient="bg-gradient-to-br from-orange-500 to-red-500"
            icon={Thermometer}
            link="/tools/fever-tracker"
          />
        </div>

        {/* SOS Info */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-red-100 border-4 border-red-500 rounded-3xl p-8 max-w-2xl">
            <p className="text-3xl font-bold text-red-700 flex items-center justify-center gap-4">
              <Siren size={48} className="animate-pulse" />
              Emergency SOS Button is always visible
            </p>
            <p className="mt-4 text-xl text-gray-700">
              Red floating button on every page — one tap can save a life
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}