import Header from "@/features/Exams/layouts/Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
   const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      // Change header state when scrolled more than 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <Header isScrolled={isScrolled}/>
      <Outlet />
    </div>
  );
}
