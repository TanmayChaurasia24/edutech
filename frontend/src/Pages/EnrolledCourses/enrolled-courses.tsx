import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EnrolledCoursesComp() {

  const getCourses = async()=>{
    const response = await fetch("/api/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  Filter
                  <ChevronDownIcon className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Semester</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Subject</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Introduction to Computer Science</h3>
              <div className="text-muted-foreground">
                <p>Instructor: Jane Smith</p>
                <p>Semester: Fall 2023</p>
                <p>Dates: September 1 - December 15</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Calculus I</h3>
              <div className="text-muted-foreground">
                <p>Instructor: John Doe</p>
                <p>Semester: Spring 2023</p>
                <p>Dates: January 15 - May 15</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Introduction to Psychology</h3>
              <div className="text-muted-foreground">
                <p>Instructor: Sarah Lee</p>
                <p>Semester: Fall 2023</p>
                <p>Dates: September 1 - December 15</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Principles of Economics</h3>
              <div className="text-muted-foreground">
                <p>Instructor: Michael Johnson</p>
                <p>Semester: Spring 2023</p>
                <p>Dates: January 15 - May 15</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Introduction to Biology</h3>
              <div className="text-muted-foreground">
                <p>Instructor: Emily Chen</p>
                <p>Semester: Fall 2023</p>
                <p>Dates: September 1 - December 15</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">American History</h3>
              <div className="text-muted-foreground">
                <p>Instructor: David Lee</p>
                <p>Semester: Spring 2023</p>
                <p>Dates: January 15 - May 15</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ChevronDownIcon({props}:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
