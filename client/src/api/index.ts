import axios from "axios";

export const initPayment = async (data) => {
  console.log(window);
  const options = {
    key: "rzp_test_aQprQUbu7mdh26",
    amount: 12333,
    currency: "INR",
    name: data.name,
    description: "Test Transaction",
    image: data.img,
    order_id: data.id,
    handler: async () => {
      try {
        const request = axios.post(
          "http://localhost:8000/techwise/client/api/payment/order/verifyData",
          {
            razorpay_order_id: data.id,
          }
        );
        console.log(request);
      } catch (error) {
        console.log(error);
      }
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzpi = new window.Razorpay(options);
  rzpi.open();
};

export const createPayment = async () => {
  try {
    const request = await axios.post(
      "http://localhost:8000/techwise/client/api/payment/order",
      {
        amount: 1222,
      }
    );

    console.log(request.data);
    if (request.data.id) {
      initPayment(request.data);
    }
  } catch (error) {
    console.log(error);
  }
};
