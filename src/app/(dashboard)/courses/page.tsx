"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/GlassCard";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  durationMinutes: number;
  difficulty: string;
  category: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const difficultyColor = (d: string) => {
    switch (d) {
      case "Beginner": return "text-green-400 bg-green-400/10";
      case "Intermediate": return "text-yellow-400 bg-yellow-400/10";
      case "Advanced": return "text-red-400 bg-red-400/10";
      default: return "text-primary bg-primary/10";
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-headline text-4xl sm:text-5xl text-on-surface tracking-[0.05em] uppercase mb-2">
        COURSES
      </h1>
      <p className="font-body text-sm text-muted-text mb-8">
        Learn AI filmmaking from fundamentals to advanced techniques
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-deep-surface animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <GlassCard key={course.id} className="overflow-hidden" hover>
              <div className="aspect-video bg-deep-surface relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-primary/30">
                    school
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`font-studio text-xs px-2 py-0.5 tracking-widest uppercase ${difficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <span className="font-studio text-xs text-primary tracking-widest uppercase block mb-1">
                  {course.category}
                </span>
                <h3 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase mb-2">
                  {course.title}
                </h3>
                <p className="font-body text-sm text-muted-text line-clamp-2 mb-4">
                  {course.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-studio text-xs text-muted-text tracking-widest">
                    {course.instructor}
                  </span>
                  <span className="font-studio text-xs text-muted-text">
                    {course.durationMinutes} min
                  </span>
                </div>

                <button className="w-full mt-4 bg-primary/10 text-primary py-2 font-studio text-xs tracking-widest uppercase hover:bg-primary/20 transition-colors duration-150">
                  Start Course
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
