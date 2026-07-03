declare global {
  interface Window {
    emailjs?: {
      init: (config: { publicKey: string }) => void;
      send: (
        serviceId: string,
        templateId: string,
        params: Record<string, string>,
      ) => Promise<unknown>;
    };
  }
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export type ConsultationEmailData = {
  name: string;
  phone: string;
  email: string;
  business_stage: string;
  message: string;
};

export function isEmailjsConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export async function sendConsultationEmail(data: ConsultationEmailData) {
  if (!isEmailjsConfigured()) {
    throw new Error('EmailJS is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.');
  }

  const emailjs = await waitForEmailjs();
  emailjs.init({ publicKey: PUBLIC_KEY });

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    business_stage: data.business_stage,
    message: data.message || 'No additional message provided.',
    reply_to: data.email,
  });
}

async function waitForEmailjs(timeoutMs = 5000): Promise<NonNullable<Window['emailjs']>> {
  if (window.emailjs) return window.emailjs;
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (window.emailjs) {
        clearInterval(interval);
        resolve(window.emailjs);
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        reject(new Error('EmailJS SDK failed to load from CDN.'));
      }
    }, 100);
  });
}
