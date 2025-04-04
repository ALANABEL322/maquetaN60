import logoFooter from "../assets/LeadtyLogo.png"
export default function Footer() {
  return (
    <footer className="bg-[#F6EEEE] border-t z-50 border-gray-200 w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-start lg:col-span-1">
            <img
              src={logoFooter}
              alt="Footer Branding Platform"
              className="h-24 w-auto mb-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:col-span-3">
        
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">About Us</h3>
              <ul className="space-y-3">
                <li>
                  <span 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1 cursor-default"
                  >
                    Who We Are
                  </span>
                </li>
                <li>
                  <span 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1 cursor-default"
                  >
                    Our Team
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Services</h3>
              <ul className="space-y-3">
                <li>
                  <span 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1 cursor-default"
                  >
                    Our Services
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <span 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1 cursor-default"
                  >
                    Contact Us
                  </span>
                </li>
                <li>
                  <span 
                    className="text-gray-600 hover:text-[#DB6A00] transition-colors block py-1 cursor-default"
                  >
                    Support
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">  {new Date().getFullYear()} Branding Platform. All rights reserved.</p>
            <div className="flex space-x-4">
              <span 
                className="text-gray-600 hover:text-[#DB6A00] transition-colors cursor-default"
              >
                Privacy Policy
              </span>
              <span 
                className="text-gray-600 hover:text-[#DB6A00] transition-colors cursor-default"
              >
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}