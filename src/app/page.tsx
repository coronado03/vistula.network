"use client";

import { useState, useCallback } from "react";
import StudentTable from "../components/students-table";
import NetworkGraph from "../components/network-graph";
import EventsSection from "../components/events-section";
import { AiOutlineSearch } from "react-icons/ai";
import { members, getUniqueYears, getUniquePrograms, getRandomMember } from "@/data/students";

const years = getUniqueYears();
const programs = getUniquePrograms();

export default function Home() {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const handleRandom = useCallback(() => {
    const member = getRandomMember();
    setHighlightedId(member.id);
    setYearFilter("");
    setProgramFilter("");
    setQuery("");
    setTimeout(() => {
      const el = document.getElementById(`member-${member.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  return (
    <main className="min-h-screen bg-[#111111] text-neutral-300 px-5 md:px-10 py-10 md:py-12 font-mono">

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10 md:mb-14">

        <div className="w-full md:max-w-xl">
          <div className="flex items-baseline gap-3 mb-4 md:mb-5">
            <h1 className="text-2xl md:text-3xl text-white tracking-tight">
              vistula.network
            </h1>
            <span className="text-sm text-neutral-600">{members.length} members</span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed mb-3">
            the student directory for vistula university.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed mb-3">
            engineers, designers, writers, IR students — anyone making vistula more
            interesting. a place to find people, see who&apos;s working on what, and
            connect across departments.
          </p>
          <div className="mt-4 border border-neutral-800 rounded-md overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between gap-4 border-b border-neutral-800">
              <span className="text-xs text-neutral-500">engineering & cs</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-300 hover:text-white transition-colors underline underline-offset-2"
              >
                submit a pull request →
              </a>
            </div>
            <div className="px-4 py-3 flex items-center justify-between gap-4">
              <span className="text-xs text-neutral-500">everyone else</span>
              <a
                href="https://docs.google.com/forms/d/1NSBKyq6vrxPi5VeNbYNY5QpnwKsFqtHqrNs6IBfhWSc/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-300 hover:text-white transition-colors underline underline-offset-2"
              >
                fill out the form →
              </a>
            </div>
          </div>
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
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightedId(null);
              }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-8 pr-4 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div className="h-[220px] md:h-[340px] rounded-md overflow-hidden border border-neutral-800 bg-neutral-950">
            <NetworkGraph />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {years.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-neutral-600 mr-1">year</span>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setYearFilter(yearFilter === y ? "" : y);
                  setHighlightedId(null);
                }}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  yearFilter === y
                    ? "border-neutral-500 text-neutral-200 bg-neutral-800"
                    : "border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-400"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        {years.length > 0 && programs.length > 0 && (
          <div className="w-px h-4 bg-neutral-800 mx-1" />
        )}

        {programs.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-neutral-600 mr-1">program</span>
            {programs.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setProgramFilter(programFilter === p ? "" : p);
                  setHighlightedId(null);
                }}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  programFilter === p
                    ? "border-neutral-500 text-neutral-200 bg-neutral-800"
                    : "border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-400"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <div className="ml-auto">
          <button
            onClick={handleRandom}
            className="text-xs px-2.5 py-1 rounded border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-400 transition-colors"
          >
            ↻ discover someone
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-5 md:mx-0 px-5 md:px-0">
        <StudentTable
          searchQuery={query}
          yearFilter={yearFilter}
          programFilter={programFilter}
          highlightedId={highlightedId}
        />
      </div>

      <EventsSection />

    </main>
  );
}
