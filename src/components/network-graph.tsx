"use client";

import { useEffect, useRef, useMemo } from "react";
import { members, getConnections } from "@/data/students";

interface NodePos {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  profilePic?: string;
  profileUrl?: string;
  img?: HTMLImageElement;
}

const NODE_RADIUS = 18;
const REPULSION = 3500;
const ATTRACTION = 0.012;
const DAMPING = 0.82;
const CENTER_PULL = 0.004;

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NodePos[]>([]);
  const frameRef = useRef<number>(0);
  const hoveredIdRef = useRef<string | null>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const connections = useMemo(() => getConnections(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    nodesRef.current = members.map((m) => ({
      id: m.id,
      name: m.name,
      x: W / 2 + (Math.random() - 0.5) * W * 0.6,
      y: H / 2 + (Math.random() - 0.5) * H * 0.6,
      vx: 0,
      vy: 0,
      profilePic: m.profilePic,
      profileUrl: m.website,
    }));

    nodesRef.current.forEach((node) => {
      if (node.profilePic) {
        const img = new Image();
        img.src = node.profilePic;
        img.onload = () => { node.img = img; };
      }
    });

    const getNodeAt = (x: number, y: number): NodePos | null => {
      const nodes = nodesRef.current;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = x - n.x;
        const dy = y - n.y;
        if (Math.sqrt(dx * dx + dy * dy) <= NODE_RADIUS) return n;
      }
      return null;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (dragRef.current) {
        const node = nodesRef.current.find((n) => n.id === dragRef.current!.id);
        if (node) {
          node.x = x - dragRef.current.offsetX;
          node.y = y - dragRef.current.offsetY;
          node.vx = 0;
          node.vy = 0;
        }
        return;
      }

      const hit = getNodeAt(x, y);
      hoveredIdRef.current = hit ? hit.id : null;
      canvas.style.cursor = hit ? "pointer" : "default";
    };

    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const hit = getNodeAt(x, y);
      if (hit) {
        dragRef.current = { id: hit.id, offsetX: x - hit.x, offsetY: y - hit.y };
        canvas.style.cursor = "grabbing";
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const hit = getNodeAt(x, y);
      const node = nodesRef.current.find((n) => n.id === dragRef.current!.id);
      if (node && hit?.id === node.id) {
        const dx = x - node.x;
        const dy = y - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < 4 && node.profileUrl) {
          window.open(node.profileUrl, "_blank", "noopener,noreferrer");
        }
      }
      dragRef.current = null;
      canvas.style.cursor = hit ? "pointer" : "default";
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const hit = getNodeAt(x, y);
      if (hit) {
        dragRef.current = { id: hit.id, offsetX: x - hit.x, offsetY: y - hit.y };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const node = nodesRef.current.find((n) => n.id === dragRef.current!.id);
      if (node) {
        node.x = x - dragRef.current.offsetX;
        node.y = y - dragRef.current.offsetY;
        node.vx = 0;
        node.vy = 0;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!dragRef.current) return;
      const touch = e.changedTouches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const node = nodesRef.current.find((n) => n.id === dragRef.current!.id);
      if (node) {
        const dx = x - node.x;
        const dy = y - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < 8 && node.profileUrl) {
          window.open(node.profileUrl, "_blank", "noopener,noreferrer");
        }
      }
      dragRef.current = null;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const simulate = () => {
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = REPULSION / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          nodes[i].vx -= fx;
          nodes[i].vy -= fy;
          nodes[j].vx += fx;
          nodes[j].vy += fy;
        }
      }

      connections.forEach(({ fromId, toId }) => {
        const a = nodes.find((n) => n.id === fromId);
        const b = nodes.find((n) => n.id === toId);
        if (!a || !b) return;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        a.vx += dx * ATTRACTION;
        a.vy += dy * ATTRACTION;
        b.vx -= dx * ATTRACTION;
        b.vy -= dy * ATTRACTION;
      });

      nodes.forEach((n) => {
        if (dragRef.current?.id === n.id) return; 
        n.vx += (W / 2 - n.x) * CENTER_PULL;
        n.vy += (H / 2 - n.y) * CENTER_PULL;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x = Math.max(NODE_RADIUS, Math.min(W - NODE_RADIUS, n.x + n.vx));
        n.y = Math.max(NODE_RADIUS, Math.min(H - NODE_RADIUS, n.y + n.vy));
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const nodes = nodesRef.current;
      const hoveredId = hoveredIdRef.current;
      const draggedId = dragRef.current?.id ?? null;
      const activeId = draggedId ?? hoveredId;

      connections.forEach(({ fromId, toId }) => {
        const a = nodes.find((n) => n.id === fromId);
        const b = nodes.find((n) => n.id === toId);
        if (!a || !b) return;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nodes.forEach((node) => {
        const isActive = node.id === activeId;

        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.closePath();

        if (node.img) {
          ctx.clip();
          ctx.filter = isActive ? "brightness(1.1)" : "grayscale(100%) brightness(0.75)";
          ctx.drawImage(node.img, node.x - NODE_RADIUS, node.y - NODE_RADIUS, NODE_RADIUS * 2, NODE_RADIUS * 2);
          ctx.filter = "none";
        } else {
          ctx.fillStyle = isActive ? "#3a3a3a" : "#2a2a2a";
          ctx.fill();
        }

        ctx.restore();

        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.strokeStyle = isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)";
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();

        if (isActive) {
          const label = node.name;
          ctx.font = "11px monospace";
          const textW = ctx.measureText(label).width;
          const pad = 6;
          const bw = textW + pad * 2;
          const bh = 18;
          const bx = Math.min(Math.max(node.x - bw / 2, 4), W - bw - 4);
          const by = node.y - NODE_RADIUS - bh - 5;

          ctx.fillStyle = "rgba(20,20,20,0.9)";
          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, 4);
          ctx.fill();

          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(label, bx + pad, by + bh / 2);
        }
      });
    };

    const tick = () => {
      simulate();
      draw();
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [connections]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
