// app/api/contact/route.js
import emailjs from "emailjs-com";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Environment variables (from .env.local)
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      return new Response(
        JSON.stringify({ message: "EmailJS not configured" }),
        { status: 500 }
      );
    }
    console.log(
      "ServiceID:",
      serviceID,
      "TemplateID:",
      templateID,
      "PublicKey:",
      publicKey
    );

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
      website_name: "Linkhub",
    };

    // Send email via EmailJS
    const result = await emailjs.send(
      serviceID,
      templateID,
      templateParams,
      publicKey
    );

    console.log("Email sent:", result);

    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(
      JSON.stringify({ message: err.message || "Failed to send message" }),
      { status: 500 }
    );
  }
}
