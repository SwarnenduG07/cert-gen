import Navbar from "../components/Navbar";
import { FaGithub, FaCheck } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-200">
      <Navbar />
      <div className="max-w-6xl mx-auto py-24 px-6 sm:px-8">
        {/* Elegant header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl">
            Premium features with a price that makes sense for everyone.
          </p>
        </div>
        
        {/* Pricing card with glass morphism */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-2xl shadow-xl hover:shadow-2xl p-8 md:p-12 transform transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden group">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-950/30 dark:to-indigo-950/30 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/60 dark:to-purple-900/60 rounded-2xl mb-8 shadow-md">
                  <RiVipCrownFill className="text-5xl text-indigo-600 dark:text-indigo-400" />
                </div>
                
                {/* Plan Name */}
                <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
                  Community Supporter Plan
                </h2>
                
                {/* Price */}
                <div className="flex items-center justify-center mb-8">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    1
                  </div>
                  <div className="ml-2 flex flex-col items-start">
                    <span className="text-xl font-medium text-slate-600 dark:text-slate-300">
                      GitHub Star
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      One-time "payment"
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto">
                  Support our open-source project with a star and unlock all premium features forever.
                </div>
                
                {/* Features */}
                <div className="space-y-4 mb-12 max-w-xl mx-auto">
                  {[
                    "Unlimited certificate generation",
                    "All premium templates included",
                    "Advanced customization options",
                    "Bulk certificate creation",
                    "Regular updates and new features",
                    "Priority community support"
                  ].map((text, index) => (
                    <div key={index} className="flex items-center p-3 bg-white/70 dark:bg-slate-800/50 rounded-xl">
                      <FaCheck className="text-emerald-500 dark:text-emerald-400 mr-3 flex-shrink-0" />
                      <p className="text-slate-700 dark:text-slate-300">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Disclaimer */}
                <div className="text-slate-500 dark:text-slate-400 mb-10 text-sm bg-slate-50/80 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 max-w-xl mx-auto">
                  No hidden fees, no credit card required. Your star helps us grow and improve the application for everyone!
                </div>
                
                {/* CTA Button */}
                <a 
                  href="https://github.com/yourusername/yourrepo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium transform hover:translate-y-[-2px] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaGithub className="mr-3 text-2xl" />
                  <span className="flex flex-col items-start">
                    <span className="text-white">Star on GitHub</span>
                    <span className="text-xs text-indigo-100 dark:text-indigo-200 font-normal">
                      Join our growing community
                    </span>
                  </span>
                </a>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-[-5%] right-[-5%] w-32 h-32 bg-indigo-200/20 dark:bg-indigo-900/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-32 h-32 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-2xl"></div>
          </div>
          
          {/* Testimonial */}
          <div className="text-center mt-12 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50">
              <p className="italic mb-4">
                "Starring this repo was the best decision I've made. The certificate generator has saved me countless hours of work!"
              </p>
              <p className="font-medium text-slate-700 dark:text-slate-300">
                — A very satisfied user
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
