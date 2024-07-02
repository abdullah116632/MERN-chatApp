import axios from "axios";
import toast from "react-hot-toast";

export const axiosErrorHandiling = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      toast.error(error.response.data.message || 'An error occurred.');
    } else if (error.request) {
      toast.error('No response received from the server.');
    } else {
      toast.error(error.message || 'An error occurred.');
    }
  } else {
    toast.error('An unexpected error occurred.');
  }
}
