// app/api/contact/route.js
export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      return new Response(
        JSON.stringify({ message: "EmailJS not configured properly" }),
        { status: 500 }
      );
    }

    // Prepare data for EmailJS REST API
    const emailData = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey, // same as PUBLIC KEY
      template_params: {
        from_name: name,
        from_email: email,
        message,
        website_name: "Linkhub",
      },
    };

    // Send the request to EmailJS REST endpoint
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`EmailJS Error: ${errText}`);
    }

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
