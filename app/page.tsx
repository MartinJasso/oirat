'use client';

import { FormEvent, useMemo, useState } from 'react';

type Profile = {
  name: string;
  skill: string;
  goal: string;
  hoursPerWeek: string;
  city: string;
  favoriteWin: string;
};

type Job = {
  customer: string;
  service: string;
  nextStep: string;
  status: 'Planned' | 'In Progress' | 'Logged';
  owner: string;
  infoSource: string;
};

const defaultProfile: Profile = {
  name: '',
  skill: '',
  goal: '',
  hoursPerWeek: '8',
  city: '',
  favoriteWin: ''
};

function generateJobs(profile: Profile): Job[] {
  return [
    {
      customer: `${profile.city || 'Local'} Repeat Client`,
      service: `${profile.skill || 'Core skill'} package refresh`,
      nextStep: 'AI agent drafts clear scope + price in plain language',
      status: 'Planned',
      owner: 'Planner Agent',
      infoSource: 'Pre-filled from profile + last accepted offer template'
    },
    {
      customer: `${profile.city || 'Nearby'} New Lead`,
      service: `${profile.skill || 'Service'} discovery call`,
      nextStep: 'AI agent creates short call script and logs notes automatically',
      status: 'In Progress',
      owner: 'Conversation Agent',
      infoSource: 'Sourced from web business listings + CRM history'
    },
    {
      customer: 'Best-fit Growth Account',
      service: `Outcome plan for: ${profile.goal || 'weekly growth target'}`,
      nextStep: 'AI agent writes checklist and marks completed steps from messages',
      status: 'Logged',
      owner: 'Logger Agent',
      infoSource: 'Sourced on the spot from inbox, calendar, and completed jobs'
    }
  ];
}

export default function HomePage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [started, setStarted] = useState(false);

  const jobs = useMemo(() => generateJobs(profile), [profile]);

  const coachingMessage = useMemo(() => {
    const name = profile.name || 'Builder';
    const skill = profile.skill || 'your craft';
    const goal = profile.goal || 'your next goal';

    return {
      wantToHear: `${name}, you already have what matters most: real skill in ${skill}. You can absolutely turn this into steady growth.`,
      needToHear: `To reach ${goal}, you need a repeatable weekly system: fewer promises, clearer offers, and daily job logging. Consistency beats motivation.`
    };
  }, [profile]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStarted(true);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Dynamic Coaching + AI Job Ops</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          A simple app for practical experts who want clear guidance and automatic execution.
        </h1>
        <p className="max-w-3xl text-slate-600">
          While one model writes the helpful logic, another agent scaffolds an interactive React workspace, so you get action screens instead of a wall of text.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">1) Tell us about you</h2>
          {[
            { key: 'name', label: 'Your name', placeholder: 'Alex' },
            { key: 'skill', label: 'Your strongest practical skill', placeholder: 'Hair styling, plumbing, carpentry...' },
            { key: 'goal', label: 'Main goal in the next 90 days', placeholder: 'More repeat clients with less chaos' },
            { key: 'city', label: 'Your city / service area', placeholder: 'Košice' },
            { key: 'favoriteWin', label: 'A recent win you are proud of', placeholder: 'Finished 12 jobs on time last month' }
          ].map((field) => (
            <label className="block text-sm font-medium text-slate-700" key={field.key}>
              {field.label}
              <input
                required
                value={profile[field.key as keyof Profile]}
                onChange={(event) =>
                  setProfile((prev) => ({
                    ...prev,
                    [field.key]: event.target.value
                  }))
                }
                placeholder={field.placeholder}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>
          ))}

          <label className="block text-sm font-medium text-slate-700">
            Hours you can work weekly on growth
            <input
              type="number"
              min={1}
              max={40}
              value={profile.hoursPerWeek}
              onChange={(event) => setProfile((prev) => ({ ...prev, hoursPerWeek: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <button className="w-full rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-700" type="submit">
            Generate my coaching + customer jobs
          </button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-sm">
          <h2 className="text-xl font-semibold">2) AI coaching stream</h2>
          {started ? (
            <div className="mt-4 space-y-4">
              <article className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-emerald-300">What you want to hear</p>
                <p className="mt-1 text-emerald-100">{coachingMessage.wantToHear}</p>
              </article>
              <article className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-amber-300">What you need to hear</p>
                <p className="mt-1 text-amber-100">{coachingMessage.needToHear}</p>
              </article>
              <article className="rounded-xl border border-sky-400/40 bg-sky-500/10 p-4">
                <p className="text-xs uppercase tracking-widest text-sky-300">Personal momentum</p>
                <p className="mt-1 text-sky-100">
                  Use your {profile.hoursPerWeek}-hour weekly slot to review pipeline every Monday, execute top 3 jobs daily, and let agents auto-log progress by end of day.
                </p>
              </article>
            </div>
          ) : (
            <p className="mt-4 text-slate-300">Fill the form and start the dual-agent experience.</p>
          )}
        </div>
      </section>

      {started && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Dynamic View</p>
              <h2 className="text-2xl font-semibold text-slate-900">3) AI-generated customer job management</h2>
            </div>
            <p className="text-sm text-slate-500">Known info is pre-filled. Easy-to-source info is fetched automatically.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th>Customer</th>
                  <th>Job</th>
                  <th>Agent action</th>
                  <th>Status</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.customer} className="rounded-xl bg-slate-50 text-sm text-slate-700">
                    <td className="rounded-l-xl px-3 py-3 font-medium text-slate-900">{job.customer}</td>
                    <td className="px-3 py-3">{job.service}</td>
                    <td className="px-3 py-3">
                      <p className="font-medium text-slate-900">{job.owner}</p>
                      <p>{job.nextStep}</p>
                    </td>
                    <td className="px-3 py-3">{job.status}</td>
                    <td className="rounded-r-xl px-3 py-3">{job.infoSource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
