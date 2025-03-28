"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { motion, useScroll, useSpring, animate } from "motion/react";
import { useEffect, useState } from "react";

export default function Home() {
  // Loading state and progress
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Loading animation effect
  useEffect(() => {
    // Simulate loading process
    let startTime = Date.now();
    const totalDuration = 1500; // 1.5 seconds for loading

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      setLoadingProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Finish loading
        setTimeout(() => {
          setLoading(false);
        }, 200); // Small delay after reaching 100%
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      // Cleanup if component unmounts during loading
    };
  }, []);

  // Smooth scroll setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Add smooth scrolling behavior
  useEffect(() => {
    // Function to handle smooth scrolling for anchor links
    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute("href");

      // Only apply to internal anchor links
      if (href && href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };

    // Get all anchor links on the page
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    // Cleanup event listeners
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  // Add custom scrollbar effect
  useEffect(() => {
    // Add custom scrollbar styles
    const style = document.createElement("style");
    style.textContent = `
      body::-webkit-scrollbar {
        width: 10px;
        background-color: #0d0d0d;
      }
      
      body::-webkit-scrollbar-track {
        background-color: #0d0d0d;
      }
      
      body::-webkit-scrollbar-thumb {
        background-image: linear-gradient(to bottom, #6366f1, #9333ea, #ec4899);
        border-radius: 5px;
      }
      
      body::-webkit-scrollbar-thumb:hover {
        background-image: linear-gradient(to bottom, #818cf8, #a855f7, #f472b6);
      }
    `;
    document.head.appendChild(style);

    // Clean up the added style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: "🏠",
    },
    {
      name: "Features",
      link: "#features",
      icon: "✨",
    },
    {
      name: "How It Works",
      link: "#how-it-works",
      icon: "📚",
    },
  ];

  // For the sticky scroll reveal component
  const features = [
    {
      title: "AI-Powered Content Generation",
      description:
        "Our advanced AI algorithms create structured, comprehensive study materials tailored to your specific needs. From exam preparation to job-related topics, StudyMate AI delivers personalized learning content.",
      icon: "✨",
    },
    {
      title: "Secure & Personalized Experience",
      description:
        "With secure authentication via Clerk, your study materials are always protected. Your personalized dashboard provides easy access to all your courses and tracks your learning progress in real-time.",
      icon: "🔒",
    },
    {
      title: "Structured Learning Paths",
      description:
        "Create courses with varying difficulty levels (Easy, Medium, Hard) and categorize content by type (Exam, Job, Coding, Other). Our system automatically generates chapter outlines and detailed content.",
      icon: "📚",
    },
    {
      title: "Background Processing",
      description:
        "StudyMate AI handles intensive content generation in the background, allowing you to continue using the platform while your materials are being created. Receive real-time status updates as your content is generated.",
      icon: "⚡",
    },
  ];

  // Cards for the glowing effect
  const glowingCards = [
    {
      title: "Exam Preparation",
      description: "Create comprehensive study guides for any exam or test",
      icon: "🎓",
    },
    {
      title: "Job Training",
      description:
        "Generate onboarding materials and job-specific documentation",
      icon: "💼",
    },
    {
      title: "Coding Tutorials",
      description: "Learn programming with structured, hands-on tutorials",
      icon: "💻",
    },
    {
      title: "Custom Learning",
      description: "Build personalized learning paths for any subject",
      icon: "🔍",
    },
  ];

  // The process steps
  const processSteps = [
    {
      title: "Choose Your Topic",
      description: "Select a subject, specify the type and difficulty level",
      image: "/images/step1.png", // Note: You'll need to add these images
    },
    {
      title: "AI Creates Structure",
      description: "Our AI generates a comprehensive course outline",
      image: "/images/step2.png",
    },
    {
      title: "Generate Content",
      description: "Detailed chapter content is created in the background",
      image: "/images/step3.png",
    },
    {
      title: "Learn & Grow",
      description: "Access your personalized materials anytime, anywhere",
      image: "/images/step4.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Loading screen */}
      {loading && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500">
              StudyMate AI
            </h1>

            <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                style={{ width: `${loadingProgress * 100}%` }}
              />
            </div>

            <p className="text-zinc-500 mt-4 text-sm">
              Loading amazing content...
            </p>
          </motion.div>
        </div>
      )}

      {/* Progress bar for scrolling */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Floating Navbar */}
      <FloatingNav navItems={navItems} />

      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background effects */}
        <div className="absolute inset-0 w-full h-full">
          {/* Dark gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/30 to-black"></div>

          {/* Subtle stars background */}
          <SparklesCore
            id="sparkles"
            background="transparent"
            minSize={0.2}
            maxSize={1.2}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Glowing orbs */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]"></div>

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #ffffff11 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}></div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500">
              StudyMate AI
            </span>
          </h1>

          <div className="mb-10">
            <TextGenerateEffect
              words="Transform your learning experience"
              className="text-xl md:text-3xl font-medium text-white mb-4"
            />
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-3xl mx-auto">
              Generate comprehensive, structured study materials powered by AI
              for exams, job training, and more.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 text-lg rounded-full hover:opacity-90 transition duration-300 shadow-lg shadow-indigo-500/25">
                Get Started Free
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                className="border-white/30 bg-black/60 backdrop-blur-md text-white px-8 py-6 text-lg rounded-full hover:bg-white/20 transition duration-300 shadow-lg">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section with Grid Layout */}
      <div
        id="features"
        className="py-28 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-500">
              Powerful Features
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Cutting-edge AI technology meets intuitive design to transform how
              you create and consume learning materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            {[
              {
                title: "AI-Powered Content Generation",
                description:
                  "Our advanced AI algorithms create structured, comprehensive study materials tailored to your specific needs. From exam preparation to job-related topics, StudyMate AI delivers personalized learning content.",
                icon: "✨",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                title: "Secure & Personalized Experience",
                description:
                  "With secure authentication via Clerk, your study materials are always protected. Your personalized dashboard provides easy access to all your courses and tracks your learning progress in real-time.",
                icon: "🔒",
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                title: "Structured Learning Paths",
                description:
                  "Create courses with varying difficulty levels (Easy, Medium, Hard) and categorize content by type (Exam, Job, Coding, Other). Our system automatically generates chapter outlines and detailed content.",
                icon: "📚",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Background Processing",
                description:
                  "StudyMate AI handles intensive content generation in the background, allowing you to continue using the platform while your materials are being created. Receive real-time status updates as your content is generated.",
                icon: "⚡",
                gradient: "from-pink-500 to-red-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex gap-8 items-start p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                <div
                  className={`h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section with Glowing Cards */}
      <div className="py-28 px-4 bg-black/95">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              What You Can Create
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              StudyMate AI adapts to your unique learning and teaching needs
              with versatile content generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {glowingCards.map((card, index) => (
              <CardSpotlight
                key={index}
                className="h-80 rounded-3xl bg-zinc-900/70 p-8 border border-zinc-800">
                <div className="flex flex-col h-full justify-between">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-zinc-400">{card.description}</p>
                  </div>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section with 3D Cards */}
      <div
        id="how-it-works"
        className="py-28 px-4 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(93,63,211,0.05)_0,transparent_65%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-500">
              How It Works
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              From concept to complete study materials in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connected Line */}
            <div className="absolute top-12 left-0 right-0 hidden lg:block">
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[85%] mx-auto mt-5 opacity-50"></div>
              {/* Fixed positioning for dots to center them above each card */}
              <div
                className="absolute top-0 w-3 h-3 rounded-full bg-purple-500 glow-purple-500"
                style={{ left: "calc(12.5% - 6px)" }}></div>
              <div
                className="absolute top-0 w-3 h-3 rounded-full bg-purple-500 glow-purple-500"
                style={{ left: "calc(37.5% - 6px)" }}></div>
              <div
                className="absolute top-0 w-3 h-3 rounded-full bg-purple-500 glow-purple-500"
                style={{ left: "calc(62.5% - 6px)" }}></div>
              <div
                className="absolute top-0 w-3 h-3 rounded-full bg-purple-500 glow-purple-500"
                style={{ left: "calc(87.5% - 6px)" }}></div>
            </div>

            {processSteps.map((step, index) => (
              <CardContainer
                key={index}
                className="w-full h-[400px] bg-zinc-900/70 rounded-3xl relative overflow-hidden border border-zinc-800 backdrop-blur-sm group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <CardBody className="w-full h-full">
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20 z-10 transition-all duration-500 group-hover:opacity-70"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(123,90,224,0.2)_0,transparent_60%)] transition-all duration-500 z-10"></div>

                  <div className="relative h-full w-full p-8 flex flex-col justify-between z-20">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-500/20">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>

                    <div className="mt-4">
                      <p className="text-zinc-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <div className="text-6xl opacity-80">
                        {index === 0
                          ? "📝"
                          : index === 1
                          ? "🧠"
                          : index === 2
                          ? "⚙️"
                          : "🚀"}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 px-4 bg-black">
        {/* Additional background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <SparklesCore
            id="cta-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.0}
            particleDensity={70}
            className="w-full h-full"
            particleColor="#8B5CF6"
          />
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <BackgroundBeams className="absolute inset-0 opacity-40" />
        <div className="relative z-10 max-w-5xl mx-auto rounded-[2.5rem] p-10 md:p-20 bg-zinc-900/70 border border-zinc-800 shadow-xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10">
              Join StudyMate AI today and experience the future of study
              material creation.
            </p>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-6 text-xl rounded-full hover:opacity-90 transition duration-300 shadow-lg shadow-indigo-500/25">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-500">
                StudyMate AI
              </h3>
              <p className="text-zinc-400 mt-2">
                AI-powered study material generation
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <Link
                href="/dashboard"
                className="text-zinc-400 hover:text-white transition">
                Dashboard
              </Link>
              <Link
                href="#features"
                className="text-zinc-400 hover:text-white transition">
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-zinc-400 hover:text-white transition">
                How It Works
              </Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500">
            <p>
              © {new Date().getFullYear()} StudyMate AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
