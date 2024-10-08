import * as React from 'react'

import { firstLetterToUpperCase, prettyName } from '@/utils'
import { JsonView } from '@/components/ui/json-view'
import { Label } from '@/components/ui/label'
import { Description } from '@/components/ui/description'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { CircleX } from 'lucide-react'

type FormPropsBase = {
  arg?: any
  name?: string
  description?: string
  children: React.ReactNode
}

type FormProps = FormPropsBase &
  (
    | {
        isArray: boolean
        uids: string[]
        setUids: (uids: string[]) => void
      }
    | {
        isArray?: never
        uids?: never
        setUids?: never
      }
  )

const Form = ({
  name,
  children,
  description,
  arg,
  isArray,
  uids,
  setUids,
}: FormProps) => {
  const fName = prettyName(name)

  return (
    <>
      <div className="in--grid in--w-full in--max-w-sm in--items-center in--gap-1.5">
        <Label>{fName}</Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:in--max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{fName}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="in--flex in--flex-col in--gap-3">
              {!!arg && (
                <>
                  <h4>Preview</h4>
                  <JsonView json={arg} />
                </>
              )}
              {/* If Array add the button to add more items */}
              {isArray && (
                <Button
                  color={'primary'}
                  onClick={() =>
                    setUids([
                      ...uids,
                      crypto.randomUUID() ?? Math.floor(Math.random() * 10000),
                    ])
                  }
                  size="sm"
                  className="in--mt-3"
                >
                  Add More
                </Button>
              )}
              {children}
            </div>

            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Description>{description}</Description>
      </div>
    </>
  )
}

const ArrayItemHeader = ({
  index,
  onRemove,
  name,
}: {
  index: number
  onRemove: () => void
  name?: string
}) => (
  <>
    {index !== 0 && (
      <Button
        className="in--absolute in--top-10 in--right-0 in--p-1"
        color="ghost"
        size="sm"
        onClick={onRemove}
      >
        <CircleX size={20} />
      </Button>
    )}

    <Separator className="in--mb-0">
      {firstLetterToUpperCase(name) + ' ' + (index + 1)}
    </Separator>
  </>
)

export default Object.assign(Form, {
  ArrayItemHeader,
})
