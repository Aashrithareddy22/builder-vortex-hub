import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const key = "wastezero_profile";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  location: z.string().optional(),
  skills: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileForm = z.infer<typeof schema>;

type Tab = "profile" | "password";

export default function Profile() {
  const [tab, setTab] = useState<Tab>("profile");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try { reset(JSON.parse(stored)); } catch {}
    }
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    localStorage.setItem(key, JSON.stringify(data));
    toast.success("Profile updated");
  };

  const onChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newPass = String(form.get("newPassword") || "");
    const confirm = String(form.get("confirmPassword") || "");
    if (newPass.length < 6) return toast.error("Password must be at least 6 characters");
    if (newPass !== confirm) return toast.error("Passwords do not match");
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Password changed");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <main className="min-h-[calc(100vh-56px)] container py-10">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p className="text-sm text-muted-foreground">Manage your account information and settings</p>

      <div className="mt-6 flex gap-2">
        <button onClick={() => setTab("profile")} className={`rounded-md border px-3 py-1 text-sm ${tab === "profile" ? "bg-background" : "bg-muted"}`}>Profile</button>
        <button onClick={() => setTab("password")} className={`rounded-md border px-3 py-1 text-sm ${tab === "password" ? "bg-background" : "bg-muted"}`}>Password</button>
      </div>

      {tab === "profile" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 rounded-xl border bg-card p-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <h2 className="text-base font-semibold">Personal Information</h2>
            <p className="text-xs text-muted-foreground">Update your personal information and profile details</p>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Full Name</label>
            <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Enter your full name" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Email</label>
            <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Enter your email" {...register("email")} />
            <p className="mt-1 text-xs text-muted-foreground">This is the email address used for account notifications.</p>
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="text-sm font-medium">Location</label>
            <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Enter your location" {...register("location")} />
            <p className="mt-1 text-xs text-muted-foreground">This helps match you with nearby opportunities.</p>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Skills</label>
            <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Add your skills..." {...register("skills")} />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea rows={4} className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Tell us about yourself" {...register("bio")} />
          </div>

          <div className="md:col-span-2">
            <button disabled={isSubmitting} className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground shadow hover:opacity-95 disabled:opacity-70">Save Changes</button>
          </div>
        </form>
      ) : (
        <form onSubmit={onChangePassword} className="mt-6 space-y-4 rounded-xl border bg-card p-6 md:w-1/2">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <input name="currentPassword" type="password" className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium">New Password</label>
            <input name="newPassword" type="password" className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <input name="confirmPassword" type="password" className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" />
          </div>
          <button className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground shadow hover:opacity-95">Change Password</button>
        </form>
      )}
    </main>
  );
}
