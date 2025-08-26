declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (
  options: {
    amount: number;
    orderId: string;
    currency: string;
    name: string;
    description: string;
    customerEmail: string;
    customerPhone: string;
  }
) => {
  await loadRazorpayScript();

  const razorpay = new window.Razorpay({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: options.amount * 100, // Razorpay expects amount in paise
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    prefill: {
      email: options.customerEmail,
      contact: options.customerPhone,
    },
    theme: {
      color: '#16a34a',
    },
  });

  return new Promise((resolve, reject) => {
    razorpay.on('payment.success', (response: any) => {
      resolve(response);
    });

    razorpay.on('payment.error', (error: any) => {
      reject(error);
    });

    razorpay.open();
  });
};