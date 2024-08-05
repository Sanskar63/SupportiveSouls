import React from "react";

function Footer() {
  return (
    <div className="h-auto md:h-[40vh] w-full bg-purple-mid p-4 md:p-8">
      <footer className="text-white py-8 w-full">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h5 className=" text-2xl md:text-3xl font-bold">SupportiveSouls</h5>
            <p className="mt-2 text-sm md:text-xl">An initiative towards humanity.</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h5 className=" text-sm md:text-xl font-bold">Quick Links</h5>
            <ul className="mt-2">
              {/* <li><a href="/about" className="hover:underline">About Us</a></li> */}
              <li><a href="/events" className="hover:underline text-xs md:text-sm lg:text-xl">Upcoming Events</a></li>
              <li><a href="/work" className="hover:underline text-xs md:text-sm lg:text-xl">Our Work</a></li>
              <li><a href="/contact" className="hover:underline text-xs md:text-sm lg:text-xl">Contact</a></li>
              <li><a href="/roles" className="hover:underline text-xs md:text-sm lg:text-xl">Join Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h5 className="text-sm md:text-xl  font-bold">Connect With Us</h5>
            <div className="mt-2 flex justify-center md:justify-end space-x-4">
              <a href="https://www.facebook.com/SupportiveSouls" target="_blank" className="hover:underline text-xs md:text-sm lg:text-xl">
                Facebook
              </a>
              <a href="https://twitter.com/SupportiveSouls" target="_blank" className="hover:underline text-xs md:text-sm lg:text-xl">
                Twitter
              </a>
              <a href="https://www.instagram.com/SupportiveSouls" target="_blank" className="hover:underline text-xs md:text-sm lg:text-xl">
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/SupportiveSouls" target="_blank" className="hover:underline text-xs md:text-sm lg:text-xl">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          &copy; 2024 SupportiveSouls. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
