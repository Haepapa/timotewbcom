export default function whoami() {
  return (
    <div className="space-y-1">
      <p className="text-term-gray">
        User: <span className="text-white">guest</span>
      </p>
      <p className="text-term-gray">
        Role: <span className="text-white">visitor</span>
      </p>
      <p className="text-term-gray">
        Session:{" "}
        <span className="text-white">
          {Math.random().toString(36).substring(2, 10)}
        </span>
      </p>
    </div>
  );
}
