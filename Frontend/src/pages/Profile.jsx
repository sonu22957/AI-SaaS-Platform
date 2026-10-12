import { useEffect, useState } from "react";
import { UserRound, Mail, RefreshCw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api
      .get("/users/profile")
      .then((response) => {
        if (!active) return;

        const data = response.data;
        setProfile(data.user || data.data?.user || data);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Profile load nahi ho saki."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const displayName =
    profile?.name || profile?.fullName || user?.name || "User";

  const displayEmail = profile?.email || user?.email || "Email unavailable";

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="mt-2 text-slate-400">
          View your account information.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
              <UserRound size={32} />
            </div>

            <div>
              <h2 className="text-xl font-bold">{displayName}</h2>
              <p className="text-sm text-slate-400">Account Profile</p>
            </div>
          </div>

          {loading && (
            <p className="text-slate-400">Loading profile...</p>
          )}

          {error && (
            <div className="mb-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && (
            <div className="space-y-5">
              <div className="rounded-xl border border-slate-800 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                  <UserRound size={17} />
                  Full Name
                </div>

                <p className="break-words font-medium">{displayName}</p>
              </div>

              <div className="rounded-xl border border-slate-800 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                  <Mail size={17} />
                  Email Address
                </div>

                <p className="break-words font-medium">{displayEmail}</p>
              </div>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm hover:bg-slate-800"
              >
                <RefreshCw size={16} />
                Refresh Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}