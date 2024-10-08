import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AvailableCoursesComp() {
  const [data, setData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);
  const [coursesToDisplay,setCoursesToDisplay]=useState([]);
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
    // console.log("ans",ans);
    setData(ans);
    // console.log(ans.fetchall);
    // for(let i=0;i<ans.fetchall.length;i++){
    //   console.log(ans.fetchall[i]._id)
    // }
    const totalCourse=ans.fetchall.map((course:any)=>course);
    setTotalCourses(totalCourse);
    console.log("totalcourses",totalCourses);
  };

  const enrollinCourse = async (courseId:string)=>{
      const userId=localStorage.getItem("userId");
      // console.log("userid",userId)
      // console.log("courseId",courseId)
      try{
      const response = await fetch(`/api/course/${courseId}/${userId}/add`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
        }
      })
      const ans=await response.json();
      console.log(ans);
      alert(`You are Enrolled Successfully in ${ans.name} course`)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getCourses();
  }, []);

  const display = async () => {
    // Ensure that `enrolledCourses` and `totalCourses` have been set
    if (totalCourses.length > 0 && enrolledCourses.length > 0) {
      const availableCourses = totalCourses.filter(course =>
        !enrolledCourses.some(enrolledCourse => enrolledCourse === course._id)
      );
      
      console.log("AVAILABLE COURSES", availableCourses);
      setCoursesToDisplay(availableCourses);
    }
  };
  
  useEffect(() => {
    fetchUser();
    getCourses();
  }, []);
  
  useEffect(() => {
    display();
  }, [totalCourses, enrolledCourses]);
  
  


  const fetchUser = async ()=>{
    const userId = localStorage.getItem("userId");
    const response = await fetch(`/api/user/currentuser/${userId}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    const ans = await response.json();
    setEnrolledCourses(ans.user.enrolledCourses);
    console.log("enrolled courses",ans.user.enrolledCourses)
    
  }

  useEffect(()=>{
    fetchUser();
  },[])

  // const enrollinCourse = await fetch("/api/course/66df0fbd509358bbd459f2cc/66dda86944eb01c7bdf95e3a/add",{
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + localStorage.getItem("token"),
  //   },
  // }) 

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
          {Array.isArray((coursesToDisplay as any)) &&
          (coursesToDisplay as any).length > 0 ? (
            (coursesToDisplay as any).map((course: any) => {
              return (
                <CardContent key={course._id} className="border-2 rounded-lg p-6">
                  <div className="flex flex-col gap-8">
                    <h3 className="text-xl font-bold">{course.name}</h3>
                    <p>{course.description}</p>
                    {/* <p>Total Courses: {totalCourses.map((course:any)=>course._id)}</p> */}
                  </div>
                  <div className="flex w-full justify-center">
                    <Button
                      key={course._id}
                      className="h-8 w-32"
                      onClick={()=>{enrollinCourse(course._id)}}
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
