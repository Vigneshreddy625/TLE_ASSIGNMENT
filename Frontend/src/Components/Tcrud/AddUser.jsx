import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Add user to your directory here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Phone Number</Label>
              <Input id="number" name="number" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="codeforces">Codeforce username</Label>
              <Input id="text" name="codeforces" />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="curr_rating">Current Rating</Label>
              <Input id="curr_rating" name="curr_rating" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="curr_rating">Max Rating</Label>
              <Input id="max_rating" name="max_rating" />
            </div> */}
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
  )
}
