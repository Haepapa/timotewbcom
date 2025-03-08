import React from "react";

export function whoami() {
  return (
    <div className="space-y-1">
      <p className="text-emerald-400">
        User: <span className="text-white">guest</span>
      </p>
      <p className="text-emerald-400">
        Role: <span className="text-white">visitor</span>
      </p>
      <p className="text-emerald-400">
        Session:{" "}
        <span className="text-white">
          {Math.random().toString(36).substring(2, 10)}
        </span>
      </p>
    </div>
  );
}
