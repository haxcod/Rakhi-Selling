import { Send } from "lucide-react";
import React from "react";

export const Button = ({handleSubmit,isProgress,text}) => {
  return (
    <button
      type="submit"
      onClick={handleSubmit}
      disabled={isProgress}
      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
    >
      {isProgress ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Sending...
        </>
      ) : (
        <>
          {/* <Send className="w-5 h-5 mr-2" /> */}
         {text}
        </>
      )}
    </button>
  );
};
