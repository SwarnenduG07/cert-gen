import Navbar from "../components/Navbar";
import { FaGithub, FaRegLightbulb, FaRocket, FaShieldAlt, FaCode } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#080510] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-l from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Mesh grid overlay */}
      <div className="absolute inset-0 bg-[url('/mesh-grid.png')] bg-center opacity-10 pointer-events-none"></div>
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-32 px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <HiOutlineSparkles className="text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-300">Professional Certificate Solution</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Enterprise-grade certificates.
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              Open-source price.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our professional certification platform delivers enterprise features with a commitment to open-source accessibility.
          </p>
        </div>
        
        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-[#0e0e16] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
              {/* Card header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12 border-b border-white/5">
                <div>
                  <div className="px-4 py-1 bg-indigo-900/30 border border-indigo-700/20 rounded-full inline-block mb-4">
                    <span className="text-xs font-semibold text-indigo-400">ENTERPRISE PLAN</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Community Edition</h2>
                  <p className="text-gray-400 mt-2">All enterprise features included</p>
                </div>
                
                <div className="flex flex-col items-center md:items-end">
                  <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold text-white">1</div>
                    <FaGithub className="text-2xl text-blue-400" />
                  </div>
                  <div className="text-xl text-gray-400">GitHub Star</div>
                </div>
              </div>
              
              {/* Card content */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
                      <FaRocket className="text-blue-400 mr-2" />
                      Core Features
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Unlimited certificate generation",
                        "Professional design templates",
                        "Custom branding options",
                        "Advanced typography control",
                        "Bulk issuance capabilities"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="h-6 w-6 flex items-center justify-center rounded-full bg-indigo-900/30 border border-indigo-700/20 text-blue-400 text-xs mr-3 mt-0.5">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
                      <FaShieldAlt className="text-blue-400 mr-2" />
                      Security & Compliance
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Digital signature integration",
                        "QR code verification",
                        "Tamper-proof certificates",
                        "Advanced access controls",
                        "Enterprise compliance ready"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="h-6 w-6 flex items-center justify-center rounded-full bg-indigo-900/30 border border-indigo-700/20 text-blue-400 text-xs mr-3 mt-0.5">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Technical specs */}
                <div className="bg-white/5 rounded-xl p-6 mb-12 border border-white/10">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
                    <FaCode className="text-blue-400 mr-2" />
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Format", value: "PDF / PNG / SVG" },
                      { label: "Resolution", value: "300+ DPI" },
                      { label: "Frameworks", value: "React & Next.js" },
                      { label: "Language", value: "TypeScript" },
                      { label: "Style", value: "Tailwind CSS" },
                      { label: "Security", value: "SHA-256" },
                      { label: "License", value: "MIT" },
                      { label: "Updates", value: "Continuous" }
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-xs text-gray-500">{spec.label}</span>
                        <span className="text-sm text-gray-300">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CTA section */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                  <div className="text-gray-400 max-w-xl">
                    <p className="text-sm flex items-start">
                      <FaRegLightbulb className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                      <span>
                        Supporting this open-source project with a GitHub star helps us continue 
                        developing enterprise-grade features while keeping them accessible to everyone.
                      </span>
                    </p>
                  </div>
                  
                  <a 
                    href="https://github.com/SwarnenduG07/cert-gen" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-white font-medium transition transform hover:translate-y-[-2px] shadow-lg hover:shadow-indigo-500/25"
                  >
                    <FaGithub className="mr-3 text-xl" />
                    <span>Star on GitHub</span>
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social proof */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <p className="text-gray-300 mb-4">"chori karna pap hai, agar pakde jao to."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">JS</div>
                <div className="ml-3">
                  <p className="text-white font-medium">Jadu</p>
                  <p className="text-gray-500 text-sm">koi milgaya ka </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <p className="text-gray-300 mb-4">"JO kara hai karo bhai, Jay baba ki"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">AL</div>
                <div className="ml-3">
                  <p className="text-white font-medium">Salman khan</p>
                  <p className="text-gray-500 text-sm">Race 3 wala</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
