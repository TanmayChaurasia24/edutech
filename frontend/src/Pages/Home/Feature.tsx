import { SparklesTextDemo } from "@/components/Magictext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Code, Cpu, Globe } from "lucide-react";
import React from "react";

type Props = {};

const Feature = (props: Props) => {
  return (
    <div className="flex flex-col items-center h-auto  justify-center gap-10">
      <div>
        <SparklesTextDemo data="Featured Courses"/>
      </div>
      <div className="w-full">
        <div className="rounded-xl w-full h-auto">
          <Tabs defaultValue="web" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="web">Web Development</TabsTrigger>
              <TabsTrigger value="ml">Machine Learning</TabsTrigger>
              <TabsTrigger value="ds">Data Structures</TabsTrigger>
            </TabsList>
            {[
              {
                value: "web",
                title: "Web Development",
                icon: Globe,
                color: "text-blue-500",
                description: "Master modern web technologies and frameworks.",
              },
              {
                value: "ml",
                title: "Machine Learning",
                icon: Cpu,
                color: "text-green-500",
                description: "Dive into AI and machine learning algorithms.",
              },
              {
                value: "ds",
                title: "Data Structures",
                icon: Code,
                color: "text-purple-500",
                description:
                  "Build a strong foundation in computer science fundamentals.",
              },
            ].map((course) => (
              <TabsContent key={course.value} value={course.value}>
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <course.icon className={`w-8 h-8 ${course.color} mr-2`} />
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    <Button variant="outline">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Feature;
