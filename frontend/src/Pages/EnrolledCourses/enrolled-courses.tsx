import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnrolledCoursesComp() {
  const [data, setData] = useState<any>([]);
  const navigate=useNavigate();

  const getCourses = async () => {
    try {
      const response = await fetch(
        `/api/course/enrolledCourses/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        console.error("Network response was not ok", response.statusText);
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        // Handle non-JSON responses
        console.error("Expected JSON but received", contentType);
        return;
      }

      const ans = await response.json();
      console.log(ans);
      setData(ans);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

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
          {data.courses?.map((course: any) => {
            return (
              <Card>
                <CardContent>
                  <div key={course._id}>
                    <h1 className="text-xl font-bold">{course.name}</h1>
                    <p className="p-4">{course.description}</p>
                  </div>
                  <Button onClick={()=>{
                    navigate(course.name.replaceAll(" ","-"))
                  }}>View Course</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function ChevronDownIcon({ props }: any) {
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
  );
}
