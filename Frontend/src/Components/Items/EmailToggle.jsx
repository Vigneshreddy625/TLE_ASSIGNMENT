import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const EmailReminderToggle = ({ value, setValue }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* <Label htmlFor="email-reminder" className="text-xl font-medium">
        Email Reminder :
      </Label> */}
      <Switch
        id="email-reminder"
        checked={value}
        onCheckedChange={() => setValue(!value)}
      />
    </div>
  );
};

export default EmailReminderToggle;