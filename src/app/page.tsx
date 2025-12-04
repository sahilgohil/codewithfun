"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Terminal, Cpu, Award, Users, TrendingUp } from "lucide-react";
import { COURSES } from "@/data/mockData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-yellow-500/30">
      <Header />

      <main>
        {/* Hero Section - Codecademy Style */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Learn to code —<br />with the world's best
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl">
                Join millions of learners worldwide. Build real projects, earn certificates, and accelerate your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FFD500] hover:bg-[#FFE234] text-gray-900 text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start learning for free
                  <ArrowRight size={24} className="ml-2" />
                </Link>
                <Link
                  href="/learn/python-masterclass"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-semibold rounded-lg border-2 border-gray-900 transition-all"
                >
                  Browse courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">5M+</div>
                <div className="text-gray-600">Active learners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-gray-600">Programming languages</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600">Free to start</div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Popular courses
            </h2>
            <p className="text-xl text-gray-600">
              Start building skills with our most popular learning paths
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, index) => (
              <Link
                key={course.id}
                href={`/learn/${course.slug}`}
                className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gray-900 transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {index === 0 ? (
                      <Code2 className="text-blue-600 w-6 h-6" />
                    ) : index === 1 ? (
                      <Terminal className="text-yellow-600 w-6 h-6" />
                    ) : (
                      <Cpu className="text-green-600 w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm font-semibold text-blue-600">
                  Start course <ArrowRight size={16} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Learn With Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Why learn with us?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to go from beginner to job-ready developer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code2 className="text-blue-600 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hands-on learning</h3>
                <p className="text-gray-600 text-lg">
                  Learn by doing with our interactive code editor. Write real code from day one.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="text-purple-600 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Earn certificates</h3>
                <p className="text-gray-600 text-lg">
                  Complete courses and earn certificates to showcase your new skills.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-green-600 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Career growth</h3>
                <p className="text-gray-600 text-lg">
                  Build portfolio projects and gain the skills top employers are looking for.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#10162F] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Start your coding journey today
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join millions learning to code. It's free to get started.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#FFD500] hover:bg-[#FFE234] text-gray-900 text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Sign up for free
              <ArrowRight size={24} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
