"use client";

import { useState } from "react";
import StudentTable from "../components/students-table";
import NetworkGraph from "../components/network-graph";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-[#111111] text-neutral-300 px-5 md:px-10 py-10 md:py-12 font-mono">

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10 md:mb-14">

        <div className="w-full md:max-w-xl">
          <h1 className="text-2xl md:text-3xl text-white tracking-tight mb-4 md:mb-5">
            vistula.network
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed mb-3">
            welcome to the official webring for vistula university students.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed mb-3">
            our campus is home to engineers, writers, artists, organizers, and
            people doing interesting work across disciplines. this is a place to
            find other cool people at vistula, a directory of the students who
            make the school more interesting.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed mb-3">
            want to join?{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 underline underline-offset-2 hover:text-white transition-colors"
            >
              submit a pull request
            </a>
          </p>
          <p className="text-xs text-neutral-600 mt-4">
            inspired by{" "}
            <a href="https://oscar.so" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors underline underline-offset-2">
              oscar gaske
            </a>
            {" "}and{" "}
            <a href="https://shayaanazeem.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors underline underline-offset-2">
              shayaan azeem
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-[460px] md:shrink-0">
          <div className="relative">
            <AiOutlineSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
            />
            <input
              type="text"
              placeholder="search members..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-8 pr-4 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div className="h-[220px] md:h-[340px] rounded-md overflow-hidden border border-neutral-800 bg-neutral-950">
            <NetworkGraph />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-5 md:mx-0 px-5 md:px-0">
        <StudentTable searchQuery={query} />
      </div>

    </main>
  );
}
