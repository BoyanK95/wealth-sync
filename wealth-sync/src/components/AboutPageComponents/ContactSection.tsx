import React from "react";
import SendEmailComponent from "../SendEmailComponent";
import SocialMediaLinksCard from "../SocialMediaLinksCard";

const ContactSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
      <p className="text-muted-foreground">
        Have questions about WealthSync or want to share your feedback? I&apos;d
        love to hear from you!
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <SendEmailComponent />
        <SocialMediaLinksCard />
      </div>
    </div>
  );
};

export default ContactSection;
