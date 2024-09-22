import fb from "../../assets/fb.png"
import ig from "../../assets/ig.png"
import x from "../../assets/x.png"
import wa from "../../assets/wa.png"
import gh from "../../assets/gh.png"


export default function Footr(){


    return (
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            
            {/* Social Media Section */}
            <div>
              <h2 className="text-lg font-bold mb-4">Follow Us</h2>
              <div className="flex space-x-2 w-10 ">
                <img src={fb} alt="facebook" className="hover:scale-150 transition" />
                <img src={ig} alt="instagream"  className="hover:scale-150 transition"/>
                <img src={x} alt="twitter" className="hover:scale-150 transition"/>
                <img src={wa} alt="Whatsaap"  className="hover:scale-150 transition"/>
                
              </div>
            </div>
    
            {/* Quick Links Section */}
            <div>
              <h2 className="text-lg font-bold mb-4">Quick Links</h2>
              <ul>
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Services</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
    
            {/* Contact Section */}
            <div>
              <h2 className="text-lg font-bold mb-4">Contact Us</h2>
              <p>1234 Street Name, City</p>
              <p>Email: info@example.com</p>
              <p>Phone: +123 456 7890</p>
            </div>
    
          </div>
    
          <div className="flex justify-center items-center flex-col mt-8 text-center text-gray-500">
            <img src={gh} alt="Github" className="w-8 hover:scale-150 transition" />
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>
      );
}