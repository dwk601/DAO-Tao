"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, ChevronLeft, Moon, Plus, Settings, Sun } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function DAONotificationsAndRules() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [newRule, setNewRule] = useState({ name: "", description: "", active: true })

  const daoNotifications = [
    { id: 1, dao: "Uniswap", message: "New governance proposal: UIP-1", time: "2 hours ago" },
    { id: 2, dao: "Aave", message: "Voting period for AIP-5 ends in 24 hours", time: "5 hours ago" },
    { id: 3, dao: "MakerDAO", message: "Emergency shutdown procedure initiated", time: "1 day ago" },
    { id: 4, dao: "Compound", message: "New market added: cUSDC", time: "2 days ago" },
    { id: 5, dao: "SushiSwap", message: "Rewards distribution for SUSHI/ETH pool", time: "3 days ago" },
  ]

  const interactionRules = [
    { id: 1, name: "Auto-approve small transactions", description: "Automatically approve transactions under 0.1 ETH", active: true },
    { id: 2, name: "Require 2FA for large transactions", description: "Enable 2FA for transactions over 1 ETH", active: true },
    { id: 3, name: "Delay high-value transactions", description: "24-hour delay for transactions over 10 ETH", active: false },
  ]

  const handleNewRule = () => {
    // In a real application, this would add the new rule to the list
    console.log("New rule added:", newRule)
    setNewRule({ name: "", description: "", active: true })
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4 space-y-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">DAO Notifications & Rules</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* DAO Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>DAO Notifications</CardTitle>
              <CardDescription>Stay updated with your DAOs</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {daoNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4 mb-4">
                    <Avatar>
                      <AvatarFallback>{notification.dao[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.dao}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Interaction Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Interaction Rules</CardTitle>
              <CardDescription>Manage your Safe's smart contract interaction rules</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {interactionRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                    <Switch checked={rule.active} />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add New Rule
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Rule</DialogTitle>
                    <DialogDescription>Set up a new rule for interacting with smart contracts.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newRule.name}
                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newRule.description}
                        onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="active" className="text-right">
                        Active
                      </Label>
                      <Switch
                        id="active"
                        checked={newRule.active}
                        onCheckedChange={(checked) => setNewRule({ ...newRule, active: checked })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleNewRule}>Save Rule</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}