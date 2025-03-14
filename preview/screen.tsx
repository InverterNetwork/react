// React and Form Hooks
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

// UI Components - Layout & Structure
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  PopoverTrigger,
  Popover,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  PopoverContent,
  ChartContainer,
  Checkbox,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  Switch,
  // UI Components - Forms & Inputs
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  // UI Components - Interactive Elements
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/client'
import type { ChartConfig } from '@/client'

// UI Components - Display Elements
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FloatingInput,
  FloatingLabel,
  Frame,
  Input,
  NoData,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  // UI Components - Navigation
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Alert,
} from '@/index'

// Utilities
import { toAmountString } from '@inverter-network/sdk'
import { Bar, BarChart } from 'recharts'
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { useTheme } from './main'

export function Preview() {
  // Hooks
  const { theme, toggleTheme } = useTheme()
  const form = useForm()
  const [numberInputValue, setNumberInputValue] = React.useState('')
  const [_, setFormState] = React.useState({
    url: '',
    email: '',
    address: '',
    number: '',
  })

  return (
    <div className="in--flex in--flex-col in--gap-3">
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      {/* ===== Account Management Section ===== */}
      <Tabs defaultValue="account" responsive>
        <TabsList className="in--mb-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <div className="in--flex in--flex-wrap in--gap-3 in--py-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div className="in--flex in--items-center in--gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when youre done.
              </CardDescription>
            </CardHeader>
            <CardContent className="in--space-y-2">
              <div className="in--space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="in--space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, youll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="in--space-y-2">
              <div className="in--space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="in--space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Separator className="in--my-3" />

      {/* ===== Status Indicators ===== */}
      <div className="in--flex in--gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="secondary">Secondary</Badge>
      </div>
      <Separator className="in--my-3" />

      <div className="in--flex in--flex-col in--gap-2">
        <Alert variant="default">Default</Alert>
        <Alert variant="destructive">Destructive</Alert>
        <Alert variant="success">Success</Alert>
        <Alert variant="warning">Warning</Alert>
        <Alert variant="error">Error</Alert>
      </div>

      {/* ===== Navigation Elements ===== */}
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Separator className="in--my-3" />

      {/* ===== Collapsible Content ===== */}
      <Collapsible>
        <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
      <Separator className="in--my-3" />

      {/* ===== FAQ Accordion ===== */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator className="in--my-3" />

      {/* ===== Modal Dialog ===== */}
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Separator className="in--my-3" />

      {/* ===== Loading States ===== */}
      <div className="in--flex in--flex-col in--space-y-3">
        <Skeleton className="in--h-[125px] in--w-[250px] in--rounded-xl" />
        <div className="in--space-y-2">
          <Skeleton className="in--h-4 in--w-[250px]" />
          <Skeleton className="in--h-4 in--w-[200px]" />
        </div>
      </div>
      <Separator className="in--my-3" />

      {/* ===== Empty States ===== */}
      <div className="in--flex in--gap-4 in--items-center">
        <NoData />
        <NoData inline />
      </div>
      <Separator className="in--my-3" />

      {/* ===== Pagination Controls ===== */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Separator className="in--my-3" />

      {/* ===== Content Frame ===== */}
      <Frame>
        <h3>{'This is a Frame :)'}</h3>
      </Frame>
      <Separator className="in--my-3" />

      {/* ===== Form Inputs ===== */}
      {/* Text Input */}
      <div className="in--relative">
        <FloatingInput id="floating-customize" />
        <FloatingLabel htmlFor="floating-customize">Text Input</FloatingLabel>
      </div>

      {/* Number Input */}
      <div className="in--relative">
        <FloatingInput
          id="floating-customize"
          onChange={(e) => {
            setNumberInputValue(toAmountString(e.target.value))
          }}
          value={numberInputValue}
          type="tel"
        />
        <FloatingLabel htmlFor="floating-customize">Number Input</FloatingLabel>
      </div>

      {/* Switch */}
      <div className="in--flex in--items-center in--gap-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>

      <Separator className="in--my-3" />

      {/* ===== Form with Validation ===== */}
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Separator className="in--my-3" />

      {/* ===== Toast Demo ===== */}
      <Button
        color={'primary'}
        onClick={() => {
          const minLength = 10
          const maxLength = 400
          const randomLength =
            Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
          const randomText = Array(randomLength)
            .fill(null)
            .map(() => Math.random().toString(36).charAt(2))
            .join('')
        }}
      >
        Test Toast
      </Button>
      <Separator className="in--my-3" />

      {/* ===== Table ===== */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>123-456-7890</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator className="in--my-3" />

      {/* Data Table */}
      {(() => {
        const data: Payment[] = [
          {
            id: 'm5gr84i9',
            amount: 316,
            status: 'success',
            email: 'ken99@yahoo.com',
          },
          {
            id: '3u1reuv4',
            amount: 242,
            status: 'success',
            email: 'Abe45@gmail.com',
          },
          {
            id: 'derv1ws0',
            amount: 837,
            status: 'processing',
            email: 'Monserrat44@gmail.com',
          },
          {
            id: '5kma53ae',
            amount: 874,
            status: 'success',
            email: 'Silas22@gmail.com',
          },
          {
            id: 'bhqecj4p',
            amount: 721,
            status: 'failed',
            email: 'carmella@hotmail.com',
          },
        ]

        type Payment = {
          id: string
          amount: number
          status: 'pending' | 'processing' | 'success' | 'failed'
          email: string
        }

        const columns: ColumnDef<Payment>[] = [
          {
            id: 'select',
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
              <div className="in--capitalize">{row.getValue('status')}</div>
            ),
          },
          {
            accessorKey: 'email',
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                  }
                >
                  Email
                  <ArrowUpDown />
                </Button>
              )
            },
            cell: ({ row }) => (
              <div className="in--lowercase">{row.getValue('email')}</div>
            ),
          },
          {
            accessorKey: 'amount',
            header: () => <div className="in--text-right">Amount</div>,
            cell: ({ row }) => {
              const amount = parseFloat(row.getValue('amount'))

              // Format the amount as a dollar amount
              const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(amount)

              return (
                <div className="in--text-right in--font-medium">
                  {formatted}
                </div>
              )
            },
          },
          {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
              const payment = row.original

              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="in--h-8 in--w-8 in--p-0">
                      <span className="in--sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(payment.id)}
                    >
                      Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        ]

        function DataTableDemo() {
          const [sorting, setSorting] = useState<SortingState>([])
          const [columnFilters, setColumnFilters] =
            useState<ColumnFiltersState>([])
          const [columnVisibility, setColumnVisibility] =
            useState<VisibilityState>({})
          const [rowSelection, setRowSelection] = useState({})

          const table = useReactTable({
            data,
            columns,
            onSortingChange: setSorting,
            onColumnFiltersChange: setColumnFilters,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            onColumnVisibilityChange: setColumnVisibility,
            onRowSelectionChange: setRowSelection,
            state: {
              sorting,
              columnFilters,
              columnVisibility,
              rowSelection,
            },
          })

          return (
            <div className="in--w-full">
              <div className="in--flex in--items-center in--py-4">
                <Input
                  placeholder="Filter emails..."
                  value={
                    (table.getColumn('email')?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table.getColumn('email')?.setFilterValue(event.target.value)
                  }
                  className="in--max-w-sm"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="in--ml-auto">
                      Columns <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="in--capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="in--rounded-md in--border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="in--h-24 in--text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="in--flex in--items-center in--justify-end in--space-x-2 in--py-4">
                <div className="in--flex-1 in--text-sm in--text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{' '}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="in--space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )
        }

        return <DataTableDemo />
      })()}

      <Separator className="in--my-3" />

      {/* ===== Popover ===== */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="in--w-80">
          <div className="in--grid in--gap-4">
            <div className="in--space-y-2">
              <h4 className="in--font-medium in--leading-none">Dimensions</h4>
              <p className="in--text-sm in--text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="in--grid in--gap-2">
              <div className="in--grid in--grid-cols-3 in--items-center in--gap-4">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="in--col-span-2 in--h-8"
                />
              </div>
              <div className="in--grid in--grid-cols-3 in--items-center in--gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="in--col-span-2 in--h-8"
                />
              </div>
              <div className="in--grid in--grid-cols-3 in--items-center in--gap-4">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  defaultValue="25px"
                  className="in--col-span-2 in--h-8"
                />
              </div>
              <div className="in--grid in--grid-cols-3 in--items-center in--gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input
                  id="maxHeight"
                  defaultValue="none"
                  className="in--col-span-2 in--h-8"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Separator className="in--my-3" />

      {/* ===== Chart ===== */}
      {(() => {
        const chartData = [
          { month: 'January', desktop: 186, mobile: 80 },
          { month: 'February', desktop: 305, mobile: 200 },
          { month: 'March', desktop: 237, mobile: 120 },
          { month: 'April', desktop: 73, mobile: 190 },
          { month: 'May', desktop: 209, mobile: 130 },
          { month: 'June', desktop: 214, mobile: 140 },
        ]

        const chartConfig = {
          desktop: {
            label: 'Desktop',
            color: '#2563eb',
          },
          mobile: {
            label: 'Mobile',
            color: '#60a5fa',
          },
        } satisfies ChartConfig

        return (
          <ChartContainer
            config={chartConfig}
            className="in--min-h-[200px] in--w-full"
          >
            <BarChart accessibilityLayer data={chartData}>
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        )
      })()}
      <Separator className="in--my-3" />
    </div>
  )
}
