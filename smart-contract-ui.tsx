"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ChevronDown, Moon, Settings, Sun } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SmartContractUI() {
  const [input, setInput] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    // Simulating NLP interpretation
    setInterpretation(`Interpreted as: Transfer 0.1 ETH to 0x1234...5678`)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4 space-y-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Smart Contract Interaction</h1>
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
                <DropdownMenuItem>Language</DropdownMenuItem>
                <DropdownMenuItem>Theme</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Natural Language Input</CardTitle>
            <CardDescription>Enter your command in plain English</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="E.g., Send 0.1 ETH to Alice"
                value={input}
                onChange={handleInputChange}
              />
              {interpretation && (
                <div className="text-sm text-muted-foreground">{interpretation}</div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Execute Transaction</Button>
          </CardFooter>
        </Card>

        {/* Transaction Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Action:</span>
                <span>Transfer ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>0.1 ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Recipient:</span>
                <span>0x1234...5678</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Fee:</span>
                <span>0.002 ETH</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>0.102 ETH</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card>
          <CardHeader>
            <CardTitle>Security Features</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signatures">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signatures">Multi-Sig</TabsTrigger>
                <TabsTrigger value="history">Transaction History</TabsTrigger>
              </TabsList>
              <TabsContent value="signatures">
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span>Required Signatures:</span>
                    <Badge>2/3</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <span>Alice</span>
                    <Badge variant="outline" className="ml-auto">Signed</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <span>Bob</span>
                    <Badge variant="outline" className="ml-auto">Pending</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <span>Charlie</span>
                    <Badge variant="outline" className="ml-auto">Pending</Badge>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history">
                <ScrollArea className="h-[200px] mt-4">
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Badge variant="outline">{i + 1}</Badge>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Transfer 0.5 ETH to 0x9876...5432
                          </p>
                          <p className="text-sm text-muted-foreground">
                            2 hours ago
                          </p>
                        </div>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}