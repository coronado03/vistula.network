"use client";

import { useMemo } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { members } from "@/data/students";

const SocialIcon = ({ type, url }: { type: "instagram" | "twitter" | "linkedin"; url: string }) => {
  const icon = {
    instagram: <AiOutlineInstagram size={15} />,
    twitter: <FaXTwitter size={13} />,
    linkedin: <FaLinkedinIn size={13} />,
  }[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-500 hover:text-neutral-200 transition-colors duration-150"
      aria-label={type}
    >
      {icon}
    </a>
  );
};

interface Props {
  searchQuery?: string;
  yearFilter?: string;
  programFilter?: string;
  highlightedId?: string | null;
}

export default function StudentsTable({
  searchQuery = "",
  yearFilter = "",
  programFilter = "",
  highlightedId = null,
}: Props) {
  const filtered = useMemo(() => {
    let result = members;

    if (yearFilter) {
      result = result.filter(m => m.year === yearFilter);
    }
    if (programFilter) {
      result = result.filter(m => m.program === programFilter);
    }

    const q = searchQuery.toLowerCase();
    if (q) {
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          (m.program?.toLowerCase().includes(q) ?? false) ||
          (m.roles?.some((r) => r.toLowerCase().includes(q)) ?? false) ||
          (m.lookingFor?.some((l) => l.toLowerCase().includes(q)) ?? false)
      );
    }

    return result;
  }, [searchQuery, yearFilter, programFilter]);

  return (
    <div className="w-full">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-800">
            <th className="text-left text-neutral-500 font-normal pb-3 pr-8 w-48">name</th>
            <th className="text-left text-neutral-500 font-normal pb-3 pr-8 w-52">program</th>
            <th className="text-left text-neutral-500 font-normal pb-3 pr-8">site</th>
            <th className="text-left text-neutral-500 font-normal pb-3 pr-8">looking for</th>
            <th className="text-left text-neutral-500 font-normal pb-3">links</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((member) => {
            const isHighlighted = member.id === highlightedId;
            return (
              <tr
                key={member.id}
                id={`member-${member.id}`}
                className={`border-b border-neutral-800/50 group transition-colors duration-100 ${
                  isHighlighted
                    ? "bg-neutral-800/60"
                    : "hover:bg-neutral-900/40"
                }`}
              >
                <td className="py-3 pr-8">
                  <div className="flex items-center gap-2.5">
                    {member.profilePic ? (
                      <img
                        src={member.profilePic}
                        alt={member.name}
                        className="w-7 h-7 rounded-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-xs">
                        {member.name[0]}
                      </div>
                    )}
                    <span className="text-neutral-200 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </div>
                </td>

                <td className="py-3 pr-8">
                  <div className="text-neutral-400">{member.program ?? "—"}</div>
                  {member.year && (
                    <div className="text-neutral-600 text-xs mt-0.5">{member.year}</div>
                  )}
                </td>

                <td className="py-3 pr-8">
                  {member.website ? (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-200 transition-colors underline-offset-2 hover:underline"
                    >
                      {member.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  ) : (
                    <span className="text-neutral-700">—</span>
                  )}
                </td>

                <td className="py-3 pr-8">
                  {member.lookingFor && member.lookingFor.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {member.lookingFor.map((item) => (
                        <span
                          key={item}
                          className="text-xs text-neutral-500 border border-neutral-700 rounded px-1.5 py-0.5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-neutral-700">—</span>
                  )}
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-3">
                    {member.instagram && <SocialIcon type="instagram" url={member.instagram} />}
                    {member.twitter && <SocialIcon type="twitter" url={member.twitter} />}
                    {member.linkedin && <SocialIcon type="linkedin" url={member.linkedin} />}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="text-neutral-600 text-sm mt-8 text-center">no members found.</p>
      )}
    </div>
  );
}
