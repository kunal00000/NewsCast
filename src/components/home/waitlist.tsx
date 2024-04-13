'use client';

import { useState } from 'react';

const Waitlist = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log({ name, email });

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
      }),
    });

    if (!res.ok) {
      alert('Error joining waitlist. ' + (await res.json()).message);
      return;
    }

    setName('');
    setEmail('');

    alert('Thank you for joining the waitlist. We will notify you soon!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-xs space-y-4 md:max-w-md"
      method="POST"
    >
      <input
        className="w-full rounded-md bg-white px-4 py-2 text-sm text-black focus:border-none focus:outline focus:outline-white/50"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        className="w-full rounded-md bg-white px-4 py-2 text-sm text-black focus:border-none focus:outline focus:outline-white/50"
        name="email_address"
        placeholder="Enter your email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <button
        className="mt-4 w-full rounded-md bg-white/20 px-4 py-2 text-sm text-white/80"
        type="submit"
      >
        Join Waitlist
      </button>
    </form>
  );
};

export default Waitlist;
