import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type UserProfile = {
  name: string;
  email: string;
  location?: string;
  skills: string[];
  bio?: string;
  role?: string;
};

const STORAGE_KEY = "wastezero_profile";
const PASS_KEY = "wastezero_password";

function loadProfile(): UserProfile {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const p = JSON.parse(raw) as UserProfile;
      return { skills: [], ...p, skills: p.skills || [] };
    } catch {}
  }
  return {
    name: "",
    email: "",
    location: "",
    skills: [],
    bio: "",
  };
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [current, setCurrent] = useState<string>("");
  const [nextPass, setNextPass] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const skillString = useMemo(
    () => profile.skills.join(", "),
    [profile.skills],
  );

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((p) => ({ ...p }));
    toast.success("Profile updated");
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = localStorage.getItem(PASS_KEY) || "";
    if (existing && current !== existing) {
      toast.error("Current password is incorrect");
      return;
    }
    if (nextPass.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (nextPass !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    localStorage.setItem(PASS_KEY, nextPass);
    setCurrent("");
    setNextPass("");
    setConfirm("");
    toast.success("Password changed");
  };

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-background to-muted/30">
      <section className="container py-10">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account information and settings
        </p>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <form onSubmit={saveProfile} className="mt-4 space-y-6">
              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-semibold">Personal Information</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <input
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      value={profile.location || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      placeholder="City, Region"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Skills</label>
                    <input
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      value={skillString}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          skills: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="teamwork, programming, sustainability"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Separate skills with commas.
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      rows={4}
                      value={profile.bio || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-4 py-2 text-primary-foreground shadow hover:opacity-95"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="password">
            <form onSubmit={savePassword} className="mt-4 space-y-6">
              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-semibold">Change Password</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      placeholder="Current password"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">New Password</label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      value={nextPass}
                      onChange={(e) => setNextPass(e.target.value)}
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-4 py-2 text-primary-foreground shadow hover:opacity-95"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
