"use client"

import React from "react"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { MenuItem } from "@/services/food-place-service"
// Import the server actions
import { createMenuItem, updateMenuItem } from "@/app/food-places/[id]/menu/actions"

interface AddMenuItemDialogProps {
  foodId: number
}

export function AddMenuItemDialog({ foodId }: AddMenuItemDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Menu Item</DialogTitle>
          <DialogDescription>Add a new item to the menu. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form
          action={async (formData) => {
            await createMenuItem(foodId, formData)
            setOpen(false)
          }}
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" step="0.01" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" name="image" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="isSpecial" name="isSpecial" />
            <Label htmlFor="isSpecial">Special Item</Label>
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface EditMenuItemDialogProps {
  foodId: number
  menuItem: MenuItem
}

export function EditMenuItemDialog({ foodId, menuItem }: EditMenuItemDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
          <DialogDescription>Update the menu item details. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form
          action={async (formData) => {
            await updateMenuItem(foodId, menuItem.id, formData)
            setOpen(false)
          }}
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" name="name" defaultValue={menuItem.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-price">Price</Label>
            <Input id="edit-price" name="price" type="number" step="0.01" defaultValue={menuItem.price} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              rows={3}
              defaultValue={menuItem.description || undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-image">Image URL</Label>
            <Input id="edit-image" name="image" defaultValue={menuItem.image || undefined} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="edit-isSpecial" name="isSpecial" defaultChecked={menuItem.isSpecial} />
            <Label htmlFor="edit-isSpecial">Special Item</Label>
          </div>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
