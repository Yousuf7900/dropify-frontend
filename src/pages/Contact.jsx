import { Helmet } from "react-helmet-async";

const Contact = () => {
    return (
        <div className="min-h-screen bg-white px-6 py-16">
            <Helmet>
                <title>Dropify | Contact</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-600">
                        Have questions? We’d love to hear from you.
                    </p>
                </div>

                {/* Contact Card */}
                <div className="bg-gray-50 rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-8">
                    {/* Info */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Reach out to us for support, partnerships, or general inquiries.
                        </p>

                        <div className="space-y-4 text-gray-700">
                            <p>
                                <span className="font-medium">Email:</span> support@dropify.com
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span> +880 1234 567 890
                            </p>
                            <p>
                                <span className="font-medium">Location:</span> Dhaka, Bangladesh
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            rows="4"
                            placeholder="Your Message"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
