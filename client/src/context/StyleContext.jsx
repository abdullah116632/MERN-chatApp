import {createContext, useContext, useEffect, useState} from 'react';

const StyleContext = createContext()

export const useStyleContext = () => {
    return useContext(StyleContext)
}

const StyleContextProvider = ({children}) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showMessages, setShowMessages] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
          setShowMessages(false);
        }
      };

      useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  return (
    <StyleContext.Provider value={{isMobile, showMessages, setShowMessages}}>
        {children}
    </StyleContext.Provider>
  )
}

export default StyleContextProvider;
