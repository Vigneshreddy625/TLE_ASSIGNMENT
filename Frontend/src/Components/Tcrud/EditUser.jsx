import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EditUser({ user }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="p-2 rounded-md transition-colors hover:bg-red-100 dark:hover:bg-blue-900 group">
            <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Edit user in your directory here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={user.name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue={user.email} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Phone Number</Label>
              <Input id="number" name="number" defaultValue={user.phone} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="codeforces">Codeforce Handle</Label>
              <Input
                id="text"
                name="codeforces"
                defaultValue={user.Codeforces}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="curr_rating">Current Rating</Label>
              <Input
                id="curr_rating"
                name="curr_rating"
                defaultValue={user.currentRating}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="curr_rating">Max Rating</Label>
              <Input
                id="max_rating"
                name="max_rating"
                defaultValue={user.maxRating}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
