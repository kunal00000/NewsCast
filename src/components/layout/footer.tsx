import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute w-full py-8 text-center">
      <p className="text-gray-400">
        A project by{' '}
        <Link
          href="https://twitter.com/kunalvermax"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-200 underline-offset-4 transition-colors hover:underline"
        >
          Kunal Verma
        </Link>
        .
      </p>
    </div>
  );
}
