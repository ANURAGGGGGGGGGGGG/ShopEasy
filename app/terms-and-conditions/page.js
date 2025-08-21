import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. User Agreement</h2>
        <p className="text-gray-700">By accessing and using this website, you agree to comply with all applicable laws and regulations. You must not use our services for any unlawful or prohibited activities.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Privacy Policy</h2>
        <p className="text-gray-700">We are committed to protecting your privacy. Any personal information collected will be used solely for order processing and will not be shared with third parties except as required by law.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Payment and Refunds</h2>
        <p className="text-gray-700">Payments are processed securely. Refunds are subject to our refund policy. Please contact support for any payment-related queries.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Changes to Terms</h2>
        <p className="text-gray-700">We reserve the right to update these terms and conditions at any time. Changes will be posted on this page and are effective immediately.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
        <p className="text-gray-700">If you have any questions about these terms, please contact us at support@example.com.</p>
      </section>
    </div>
  );
}