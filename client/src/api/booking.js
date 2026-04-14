import axiosInstance from "./index.js";

export const makePayment = async (token, amount) => {
  const response = await axiosInstance.post("/payment/make-payment", {
    token,
    amount,
  });
  return response.data;
};

export const bookShow = async (payload) => {
  const response = await axiosInstance.post("/booking/book-show", payload);
  return response.data;
};

export const getAllBookings = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/bookings/get-all-bookings/${payload.userId}`,
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};
