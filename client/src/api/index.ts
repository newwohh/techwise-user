import axios from "axios";

export const placeOrder = async (data) => {
  console.log(data);
  const response = await axios.post(
    "http://localhost:8000/techwise/client/api/order/create",
    data
  );
  console.log(response.data);
};

export const initPayment = async (data) => {
  const options = {
    key: "rzp_test_aQprQUbu7mdh26",
    amount: data.amount.toString(),
    currency: data.currency,
    name: "Techwise",
    description: "Test Transaction",
    image: "ing",
    order_id: data.id,
    handler: async function (response) {
      console.log(response);
      const dataReq = {
        orderCreationId: data.id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };

      const request = await axios.post(
        "http://localhost:8000/techwise/client/api/payment/verify",
        dataReq,
        { withCredentials: true }
      );
      console.log(request);
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzpi = new window.Razorpay(options);
  rzpi.open();
};
