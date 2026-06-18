export const contactSectionCopy = {
  heading: "Get In Touch",
  connectHeading: "Connect With Me",
  connectDescription: "Click the center button to expand my social links",
  sendLabel: "Send Message",
  sendingLabel: "Sending...",
  sentLabel: "Message Sent!",
  failedLabel: "Failed to send",
}

export const contactFormFields = {
  name: { label: "Name", placeholder: "John Doe" },
  email: { label: "Email", placeholder: "john@example.com", type: "email" },
  subject: { label: "Subject", placeholder: "What's this about?" },
  message: { label: "Message", placeholder: "Tell me about your project, idea, or just say hi..." },
} as const

export const contactApiEndpoint = "/api/contact"
