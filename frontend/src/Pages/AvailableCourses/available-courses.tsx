import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AvailableCoursesComp() {
  const [data, setData] = useState([]);
  // const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  const getCourses = async () => {
    const response = await fetch("/api/course/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const ans = await response.json();
    setData(ans);
    console.log("data", data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  

  const navigateTo = (name: string) => {
    console.log("clicked");
    navigate(`/${name}`);
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Unlock Your Potential with Our Courses
              </h1>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our wide range of courses and take the first step
                towards achieving your goals. From beginner to advanced, we have
                something for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-8 px-4 md:px-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray((data as any).fetchall) &&
          (data as any).fetchall.length > 0 ? (
            (data as any).fetchall.map((course: any) => {
              return (
                <CardContent key={course._id} className="border-2 rounded-lg p-6">
                  <div className="flex flex-col gap-8">
                    <h3 className="text-xl font-bold">{course.name}</h3>
                    <p>{course.description}</p>
                  </div>
                  <div className="flex w-full justify-center">
                    <Button
                      key={course._id}
                      onClick={() => navigateTo(course.name.replaceAll(" ", "-"))}
                      className="h-8 w-32"
                    > 
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              );
            })
          ) : (
            <p>No available courses</p>
          )}
        </div>
      </section>
    </div>
  );
}
