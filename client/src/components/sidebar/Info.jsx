import { useStyleContext } from "../../context/StyleContext";

const Info = ({ setIsInfoOpen }) => {
    const {isMobile} = useStyleContext()
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg text-center  mx-auto space-y-4`}>
        <p className="text-gray-900 text-2xl font-bold">
          This feature is under development.
        </p>
        <p className="text-gray-700 text-lg">
          <a 
            href="https://www.linkedin.com/in/abdullah-al-rafi-234870282/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Abdullah al rafi
          </a>
          <span> is working on it.</span>
        </p>
        <button 
          onClick={() => setIsInfoOpen(false)} 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Info;
