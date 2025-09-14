import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CalendarClock, Leaf, Handshake } from "lucide-react";

const schema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Logged in");
    navigate("/");
  };

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-background to-muted/30">
      <section className="container grid gap-10 py-10 md:grid-cols-2 md:py-16">
        {/* Left marketing */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Join the Recycling Revolution
          </h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            WasteZero connects volunteers, NGOs, and administrators to schedule
            pickups, manage recycling opportunities, and make a positive impact.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-muted-foreground max-md:grid-cols-2">
            <div className="rounded-lg border bg-background p-4">
              <CalendarClock className="h-4 w-4 text-primary" />
              <p className="mt-2">Schedule Pickups</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <Leaf className="h-4 w-4 text-primary" />
              <p className="mt-2">Track Impact</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <Handshake className="h-4 w-4 text-primary" />
              <p className="mt-2">Volunteer</p>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="mx-auto w-full max-w-md">
          <div className="mb-2 grid grid-cols-2 overflow-hidden rounded-lg border bg-muted/40 text-sm">
            <button className="bg-background px-4 py-2 font-medium">
              Login
            </button>
            <Link
              to="/register"
              className="px-4 py-2 text-center text-muted-foreground hover:text-foreground"
            >
              Register
            </Link>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Login to your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none ring-offset-background focus:ring-2 focus:ring-ring"
                  placeholder="Your username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none ring-offset-background focus:ring-2 focus:ring-ring"
                  placeholder="Your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground shadow hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
