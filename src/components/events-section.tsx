"use client";

import { events, members } from "@/data/students";

export default function EventsSection() {
  if (events.length === 0) return null;

  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="mt-14">
      <h2 className="text-sm text-neutral-500 mb-4 tracking-wide">upcoming events</h2>
      <div className="flex flex-col gap-3">
        {sorted.map((event, i) => {
          const organizer = members.find(m => m.id === event.organizer);
          const dateStr = new Date(event.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          return (
            <div
              key={i}
              className="border border-neutral-800 rounded-md px-4 py-3 flex flex-col md:flex-row md:items-start gap-2 md:gap-6"
            >
              <span className="text-xs text-neutral-600 shrink-0 pt-0.5 w-24">{dateStr}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-200 hover:text-white transition-colors underline-offset-2 hover:underline"
                    >
                      {event.title}
                    </a>
                  ) : (
                    <span className="text-neutral-200">{event.title}</span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-1">{event.description}</p>
                {organizer && (
                  <p className="text-xs text-neutral-700 mt-1">by {organizer.name}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
