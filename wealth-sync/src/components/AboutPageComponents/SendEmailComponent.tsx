import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";

const SendEmailComponent = async () => {
  //TODO Implement email form submission logic
  const t = await getTranslations("ContactPage.emailForm");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t("fields.name")}
            </label>
            <Input id="name" placeholder={t("placeholders.name")} />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t("fields.email")}
            </label>
            <Input id="email" type="email" placeholder={t("placeholders.email")} />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t("fields.message")}
            </label>
            <Textarea id="message" placeholder={t("placeholders.message")} rows={4} />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {/* TODO: Add a button to submit the form */}
        <Button className="w-full bg-green-700 hover:bg-green-800">
          <MessageSquare className="mr-2 h-4 w-4" />
          {t("send")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SendEmailComponent;
