import { SparklesTextDemo } from "@/components/Magictext";
import { Award, BookOpen, Users, Zap } from 'lucide-react'
import React from "react";

type Props = {};

const Whyus = (props: Props) => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-10">
      <div>
        <SparklesTextDemo data="Why Choose Our Courses?" />
      </div>
      <div className="h-full flex flex-col justify-center items-center gap-10">
        <div className="h-full flex flex-row justify-center items-center gap-10">
          {/* Card 1 */}
          <div className="h-[15rem] w-[30rem] border rounded-lg flex flex-col items-center justify-center p-4 transition-transform duration-500 ease-in-out transform hover:scale-105">
            <BookOpen className="h-10 w-10" />
            <h1 className="text-2xl font-bold">Comprehensive Curriculum</h1>
            <p className="font-light mt-2 text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Provident, magnam.
            </p>
          </div>

          {/* Card 2 */}
          <div className="h-[15rem] w-[30rem] border rounded-lg flex flex-col items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-105">
            <Users className="h-10 w-10" />
            <h1 className="text-2xl font-bold">Expert Instructors</h1>
            <p className="font-light mt-2 text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Provident, magnam.
            </p>
          </div>
        </div>

        <div className="h-full flex flex-row justify-center items-center gap-10">
          {/* Card 3 */}
          <div className="h-[15rem] w-[30rem] border rounded-lg flex flex-col items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-105">
            <Zap className="h-10 w-10" />
            <h1 className="text-2xl font-bold">Interactive Learning</h1>
            <p className="font-light mt-2 text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Provident, magnam.
            </p>
          </div>

          {/* Card 4 */}
          <div className="h-[15rem] w-[30rem] border rounded-lg flex flex-col items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-105">
            <Award className="h-10 w-10" />
            <h1 className="text-2xl font-bold">Recognized Certifications</h1>
            <p className="font-light mt-2 text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Provident, magnam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whyus;
