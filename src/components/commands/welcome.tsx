export default function welcome() {
  return (
    <div className="text-term-grey">
      <p className="font-semibold">Welcome to the Terminal</p>
      <p className="mt-1">
        Type <span className="cust-command-style">help</span> to see available
        commands
      </p>
    </div>
  );
}
