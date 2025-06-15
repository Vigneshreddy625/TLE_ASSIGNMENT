import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import ModeToggle from '../Darkmode/ToggleMode'
import { ArrowLeft, Menu, X } from 'lucide-react'

function Layout() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setNavbarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavbarToggle = (isCollapsed) => {
    setNavbarCollapsed(isCollapsed)
  }


  return (
    <div className='flex h-screen overflow-hidden bg-white dark:bg-black'>

      <div className={`
        ${isMobile ? 'fixed left-0 top-0 h-full z-40' : 'relative h-full lg:p-4'} 
      `}>
          <Navbar 
            onToggleCollapse={handleNavbarToggle}
            isMobile={isMobile}
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
      </div>

      <div
        className={`
          flex-1 transition-all duration-300 
          ${isMobile ? 'p-0 pt-16' : 'p-4 ml-4'}
        `}
        style={!isMobile ? {
          width: `calc(100% - ${navbarCollapsed ? '5rem' : '14rem'} - 2rem)`
        } : {}}
      >
        <div
          className={`
            relative rounded-lg bg-gradient-to-b from-white to-neutral-100 
            dark:from-neutral-950 dark:to-neutral-800 shadow-md lg:border 
            lg:border-gray-300 lg:dark:border-gray-800 h-full overflow-auto 
            flex justify-center overflow-y-auto lg:pt-12
          `}
        >
          <Outlet/>
          
          <div className={`
            absolute cursor-pointer z-20
            ${isMobile ? 'hidden' : 'right-2 top-2'}
          `}>
            <ModeToggle />
          </div>
          
          {location.pathname !== '/home' && (
            <div 
              className={`
                absolute cursor-pointer z-20
                ${isMobile ? 'hidden' : 'left-4 top-4'}
              `} 
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={isMobile ? 20 : 24} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Layout